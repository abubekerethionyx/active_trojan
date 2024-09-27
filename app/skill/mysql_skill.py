import mysql.connector
from mysql.connector import Error
import json
import os
from decimal import Decimal
from datetime import date
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def execute_query(query, params=None):
    """
    Executes a MySQL query and fetches results.

    :param query: The SQL query to execute.
    :param params: Optional parameters to pass with the query (for prepared statements).
    :return: The results of the query in JSON format.
    """
    try:
        # Establish the MySQL connection
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
        )

        if connection.is_connected():
            print("Connected to MySQL database")

            # Create a cursor object
            cursor = connection.cursor()

            # Execute the query
            cursor.execute(query, params)

            # Fetch all the rows
            result = cursor.fetchall()

            # Fetch column names
            columns = [i[0] for i in cursor.description]

            # Combine column names with results
            json_result = [
                dict(zip(columns, row)) for row in result
            ]

            # Close the cursor and connection
            cursor.close()
            connection.close()
            return {
                "error": None,
                "result": json.dumps(json_result, default=custom_serializer, indent=4),
            }

    except Error as err:
        print(f"Error: {err}")
        return {"error": str(err), "result": None}

def custom_serializer(obj):
    if isinstance(obj, date):
        return obj.isoformat()  # Convert date to ISO 8601 format (YYYY-MM-DD)
    elif isinstance(obj, Decimal):
        return float(obj)  # Convert Decimal to float
    raise TypeError(f"Type {type(obj)} is not serializable")
