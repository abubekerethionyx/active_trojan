from typing import Any, Dict
from fastapi import FastAPI
from agent.mysql_agent import SQLQueryHandler
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # You can restrict this if necessary
    allow_headers=["*"],  # You can restrict this if necessary
)

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
    
    return result

