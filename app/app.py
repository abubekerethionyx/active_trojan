from http.client import HTTPException
from typing import Any, Dict
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from agent.mysql_agent import SQLQueryHandler
from helper.GoogleDriveCsvProcessor import GoogleDriveCsvProcessor
from helper.uploaded_file import save_uploaded_file
from helper.sql_queries import get_likes, get_rating, get_review
from helper.populate_db import process_csv_to_db
import shutil
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs (e.g., restrict to trusted origins)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API to trigger CSV processing via file path, file upload, or Google Drive link
@app.post("/api/upload-csv")
async def trigger_csv_process(csv_file_path: str = Form(None), file: UploadFile = File(None)):
    """
    Endpoint to trigger CSV file processing from either a file path or a file upload.

    Args:
        csv_file_path (str): The path of the CSV file on the server.
        csv_file (UploadFile): The uploaded CSV file.

    Returns:
        Dict: A message indicating success or failure of the CSV processing.
    """
    try:
        if csv_file_path:
            # Process CSV file from provided path
            process_csv_to_db(csv_file_path)
            return {"message": "CSV processing from file path triggered successfully."}

        elif file:
            # Handle uploaded file
            temp_file_path = f"temp_files/{file.filename}"
            os.makedirs("temp_files", exist_ok=True)
            save_uploaded_file(file, temp_file_path)

            # Process the uploaded file
            process_csv_to_db(temp_file_path)

            # Optionally remove the file after processing
            os.remove(temp_file_path)

            return {"message": "CSV processing from file upload triggered successfully."}

        else:
            return {"error": "No file path or uploaded file provided."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API to trigger CSV processing from Google Drive

# Endpoint to trigger the CSV process from Google Drive
@app.post("/api/retrieve-google-docs")
async def trigger_google_drive_csv(request_data: Dict[str, Any]):
    """
    Endpoint to trigger CSV processing from a Google Drive file with required credentials.

    Args:
        request_data (Dict[str, Any]): The data containing Google Drive Document ID, API Key, and OAuth Token.

    Returns:
        Dict: A message indicating success or failure of the CSV processing.
    """
    try:
        # Extract fields from request data
        google_drive_file_id = request_data.get("documentId")
        api_key = request_data.get("apiKey")
        oauth_token = request_data.get("oauthToken")

        # Instantiate GoogleDriveCsvProcessor with required credentials
        processor = GoogleDriveCsvProcessor(
            file_id=google_drive_file_id,
            api_key=api_key,
            oauth_token=oauth_token
        )

        # Step 1: Validate the request data
        processor.validate_request_data()

        # Step 2: Download the CSV from Google Drive
        local_csv_file = processor.download_csv_from_google_drive()

        # Step 3: Process the CSV and clean up
        processor.process_and_cleanup_csv(local_csv_file)

        return {"message": "CSV processing from Google Drive triggered successfully."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Endpoint to execute SQL query
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

    return [result]

# Endpoint to retrieve reviews and ratings
@app.get("/api/reviews")
async def get_rating_distribution():
    try:
        line_graph, bar_graph = get_rating()
        card, table = get_review()
        likes = get_likes()
        response = [likes, line_graph, bar_graph, table, card]
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Another API to handle a SQL-based looker operation
@app.get("/api/looker")
async def get_rating_distribution(query: str):
    try:
        card, table = get_review()
        # Check if query is any form of "default" or an empty string
        if query.lower() in ["default", ""]:
            print("default")
            response = table.get("result")
        else:
            print("ai value")
            response = card.get("result")
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
