import mysql.connector
import csv
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

# Load environment variables from .env file
load_dotenv()

# MySQL connection parameters from environment variables
db_config = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),  # Common to both MySQL and PostgreSQL
    "port": os.getenv("DB_PORT")
}
# Create a FastAPI app
app = FastAPI()

# Define a Pydantic model for the request data
class QueryRequest(BaseModel):
    csv_file_path: str

def process_csv_to_db(csv_file_path: str):
    # Create a connection to MySQL
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    # Step 1: Create the table
    create_table_query = """
    CREATE TABLE IF NOT EXISTS reviews (
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
    );
    """
    cursor.execute(create_table_query)
    print("Table created successfully.")

    # Step 2: Read data from CSV and insert into the table
    with open(csv_file_path, mode="r", encoding="utf-8") as file:
        csv_reader = csv.DictReader(file)

        # Define the insert query
        insert_query = """
        INSERT INTO reviews (
            place_id, place_name, review_id, rating, review_text, 
            published_at, published_at_date, response_from_owner_text, 
            response_from_owner_ago, response_from_owner_date, 
            review_likes_count, total_number_of_reviews_by_reviewer, 
            total_number_of_photos_by_reviewer, is_local_guide, 
            review_translated_text, response_from_owner_translated_text
        ) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
        """

        # Insert each row from the CSV file into the database
        for row in csv_reader:
            data = (
                row["place_id"],
                row["place_name"],
                row["review_id"],
                float(row["rating"]) if row["rating"] else None,
                row["review_text"],
                row["published_at"],
                row["published_at_date"] if row["published_at_date"] else None,
                row["response_from_owner_text"],
                row["response_from_owner_ago"],
                row["response_from_owner_date"] if row["response_from_owner_date"] else None,
                int(row["review_likes_count"]) if row["review_likes_count"] else None,
                int(row["total_number_of_reviews_by_reviewer"]) if row["total_number_of_reviews_by_reviewer"] else None,
                int(row["total_number_of_photos_by_reviewer"]) if row["total_number_of_photos_by_reviewer"] else None,
                bool(row["is_local_guide"]) if row["is_local_guide"] else None,
                row["review_translated_text"],
                row["response_from_owner_translated_text"],
            )
            cursor.execute(insert_query, data)

        connection.commit()

    cursor.close()
    connection.close()
    print("Data inserted successfully.")


