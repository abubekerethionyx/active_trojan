import json
import os
from typing import Annotated, Dict
from autogen import ConversableAgent, UserProxyAgent, config_list_from_json

from skill.mysql_skill import execute_query


config_list = [
    {
        "model": "gpt-3.5-turbo",
        "api_key": "sk-66BR95cUsp90HSb4ZSb_KCGW628GCT18WP_nlDKiChT3BlbkFJZ_MJS4vzYv9svVpg23esdixNL3n3ckxyfhZLLKzwgA",
    }
]


config_list_local = [{
    "model": "llama-7B",
    "base_url": "https://d561-34-169-49-115.ngrok-free.app/v1",
    "api_type": "openai",
    "api_key": "NULL",
}]

llm_config = {
    "cache_seed": 42,  # change the cache_seed for different trials
    "temperature": 0,
    "config_list": config_list_local,
    "timeout": 120,
}


def check_termination(msg: Dict):
    if "tool_responses" not in msg:
        return False
    json_str = msg["tool_responses"][0]["content"]
    obj = json.loads(json_str)
    return "error" not in obj or obj["error"] is None and obj["reward"] == 1


sql_writer = ConversableAgent(
    "sql_writer",
    llm_config=llm_config,
    system_message="You are good at writing SQL queries. Always respond with a function call to execute_sql().",
    is_termination_msg=check_termination,
    code_execution_config={"use_docker": False},
)

user_proxy = UserProxyAgent(
    "user_proxy",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config={"use_docker": False},
)


@sql_writer.register_for_llm(
    description="Function for executing SQL query and returning a response"
)
@user_proxy.register_for_execution()
def execute_sql(
    reflection: Annotated[str, "Think about what to do"],
    sql: Annotated[str, "SQL query"],
) -> Annotated[Dict[str, str], "Dictionary with keys 'sql', 'result' and 'error'"]:
    result = execute_query(sql)
    error = result["error"]
    if not error:
        error = "The SQL query returned an incorrect result"
    if error:
        return {"sql": sql, "error": error, "result": None}
    else:
        return {
            "sql": sql,
            "error": None,
            "result": result["result"],
        }
 
schema = '''CREATE TABLE "artist" (
"Artist_ID" int,
"Artist" text,
"Age" int,
"Famous_Title" text,
"Famous_Release_date" text,
PRIMARY KEY ("Artist_ID")
)''' 
       
message = f"""Below is the schema for a SQL database:
{schema}
Generate a SQL query to answer the following question:
what is the artist age
"""

user_proxy.initiate_chat(sql_writer, message=message)