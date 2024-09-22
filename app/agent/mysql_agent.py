import json
import os
from dotenv import load_dotenv
from typing import Annotated, Dict
from autogen import ConversableAgent, UserProxyAgent
from skill.mysql_skill import execute_query

# Load environment variables from .env file
load_dotenv()

class SQLQueryHandler:
    def __init__(self):
        api_key = os.getenv("API_KEY")  # Get API key from environment variable

        self.config_list = [
            {
                "model": "gpt-3.5-turbo",
                "api_key": api_key,  # Use the loaded API key
            }
        ]

        self.llm_config = {
            "cache_seed": 42,  # change the cache_seed for different trials
            "temperature": 0,
            "config_list": self.config_list,
            "timeout": 120,
        }

        self.sql_writer = ConversableAgent(
            "sql_writer",
            llm_config=self.llm_config,
            system_message="You are good at writing SQL queries. Always respond with a function call to execute_sql().",
            is_termination_msg=self.check_termination,
            code_execution_config={"use_docker": False},
            human_input_mode="NEVER",
        )

        self.user_proxy = UserProxyAgent(
            "user_proxy",
            human_input_mode="NEVER",
            max_consecutive_auto_reply=5,
            code_execution_config={"use_docker": False},
        )

        @self.sql_writer.register_for_llm(
            description="Function for executing SQL query and returning a response"
        )
        @self.user_proxy.register_for_execution()
        def execute_sql(
            reflection: Annotated[str, "Think about what to do"],
            sql: Annotated[str, "SQL query"],
        ) -> Annotated[
            Dict[str, str], "Dictionary with keys 'sql', 'result' and 'error'"
        ]:
            result = execute_query(sql)
            error = result["error"]
            if error:
                return {"sql": sql, "error": error, "result": None}
            else:
                return {
                    "sql": sql,
                    "error": None,
                    "result": result["result"],
                }

    def check_termination(self, msg: Dict):
        if "tool_responses" not in msg:
            return False
        json_str = msg["tool_responses"][0]["content"]
        obj = json.loads(json_str)
        print("obj", obj)
        return "error" not in obj or obj["error"] is None

    def initiate_chat(self, query):
        schema = """CREATE TABLE IF NOT EXISTS reviews (
            place_id VARCHAR(255),
            place_name VARCHAR(255),
            review_id VARCHAR(255),
            rating FLOAT,
            review_text TEXT,
            published_at VARCHAR(255),
            published_at_date DATE,
            response_from_owner_text TEXT,
            response_from_owner_ago VARCHAR(255),
            response_from_owner_date DATE,
            review_likes_count INT,
            total_number_of_reviews_by_reviewer INT,
            total_number_of_photos_by_reviewer INT,
            is_local_guide BOOLEAN,
            review_translated_text TEXT,
            response_from_owner_translated_text TEXT
        );"""

        message = f"""Below is the schema for a SQL database:
        {schema}
        Generate a SQL query to answer the following question:
        {query}
        """

        response = self.user_proxy.initiate_chat(
            self.sql_writer, message=message, summary_method="last_msg"
        )
        
        # Ensure summary is parsed as JSON if it's a string
        if isinstance(response.summary, str):
            try:
                summary_json = json.loads(response.summary)
            except json.JSONDecodeError:
                return {
                    "error": "Failed to parse the summary into JSON",
                    "success": False
                }
        else:
            summary_json = response.summary  # Assuming it's already in the correct format

        # Parse the result if it's a string
        if isinstance(summary_json.get('result'), str):
            try:
                result_json = json.loads(summary_json['result'])
            except json.JSONDecodeError:
                return {
                    "error": "Failed to parse the result into JSON",
                    "success": False
                }
        else:
            result_json = summary_json.get('result')  # Assuming it's already in the correct format

        return {
            "result": result_json,
            "success": True
        }
