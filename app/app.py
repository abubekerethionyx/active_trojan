from typing import Any, Dict
from fastapi import FastAPI
from agent.mysql_agent import SQLQueryHandler

app = FastAPI()

@app.post('/api/sql-query')
async def execute_query(request_data: Dict[str, Any]):
    """
    Endpoint to execute a SQL query.

    Args:
        request_data (Dict[str, Any]): The data containing the SQL query to execute.
    
    Returns:
        Dict: The result of the SQL query execution or an error message.
    """
    query = request_data.get('query')
    if not query:
        return {"error": "Query not provided"}

    # Initialize the SQL query handler with the provided query
    sql_handler = SQLQueryHandler()
    
    # Execute the query and get the result
    result = sql_handler.initiate_chat(query)
    print(result)
    
    return result

