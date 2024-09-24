from http.client import HTTPException
from typing import Any, Dict
from helper.sql_queries import get_likes, get_rating, get_review
from helper.populate_db import  process_csv_to_db
from fastapi import FastAPI
from agent.mysql_agent import SQLQueryHandler
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/sql-query")
async def execute_api_query(request_data: Dict[str, Any]):
    """
    Endpoint to execute a SQL query.

    Args:
        request_data (Dict[str, Any]): The data containing the SQL query to execute.

    Returns:
        Dict: The result of the SQL query execution or an error message.
    """
    query = request_data.get("query")
    if not query:
        return {"error": "Query not provided"}

    # Initialize the SQL query handler with the provided query
    sql_handler = SQLQueryHandler()

    # Execute the query and get the result
    result = sql_handler.initiate_chat(query)
    print(result)
    
    return result



@app.get("/api/reviews")
async def get_rating_distribution():
    try:
        ratings = get_rating()
        reviews = get_review()
        likes = get_likes()
        response = [ratings, reviews, likes]
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
@app.post('/api/trigger-csv-process')
async def trigger_csv_process(request:  Dict[str, Any]):
    try:
        csv_file_path = request.get('csv_file_path')
        process_csv_to_db(csv_file_path)
        return {"message": "CSV processing triggered successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
