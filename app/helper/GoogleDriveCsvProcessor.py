from fastapi import FastAPI, HTTPException
from typing import Any, Dict
import os
import requests

from helper.populate_db import process_csv_to_db


class GoogleDriveCsvProcessor:
    def __init__(self, file_id: str, api_key: str, oauth_token: str):
        self.file_id = file_id
        self.api_key = api_key
        self.oauth_token = oauth_token

    def validate_request_data(self) -> None:
        """
        Validate the incoming request data to ensure required fields are present.

        Raises:
            HTTPException: If any required fields are missing.
        """
        if not self.file_id or not self.api_key or not self.oauth_token:
            raise HTTPException(
                status_code=400, 
                detail="Missing required credentials: documentId, apiKey, or oauthToken."
            )

    def download_csv_from_google_drive(self) -> str:
        """
        Download a CSV file from Google Drive using the provided credentials.

        Returns:
            str: The local file path where the CSV was saved.

        Raises:
            HTTPException: If the file download fails.
        """
        google_drive_csv_url = f"https://www.googleapis.com/drive/v3/files/{self.file_id}?alt=media&key={self.api_key}"
        headers = {
            "Authorization": f"Bearer {self.oauth_token}"
        }

        try:
            # Perform the request to download the file
            response = requests.get(google_drive_csv_url, headers=headers)
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code, 
                    detail="Failed to retrieve CSV from Google Drive."
                )
            
            # Save the file locally
            local_csv_file = f"temp_files/{self.file_id}.csv"
            os.makedirs("temp_files", exist_ok=True)
            with open(local_csv_file, "wb") as file:
                file.write(response.content)

            return local_csv_file

        except Exception as e:
            raise HTTPException(
                status_code=500, 
                detail=f"Error downloading file: {str(e)}"
            )

    def process_and_cleanup_csv(self, local_csv_file: str) -> None:
        """
        Process the downloaded CSV file and clean up afterward.

        Args:
            local_csv_file (str): The local path of the downloaded CSV file.

        Raises:
            HTTPException: If the file processing fails.
        """
        try:
            # Process the CSV file (assuming process_csv_to_db is defined elsewhere)
            process_csv_to_db(local_csv_file)

            # Optionally remove the file after processing
            os.remove(local_csv_file)

        except Exception as e:
            raise HTTPException(
                status_code=500, 
                detail=f"Error processing CSV: {str(e)}"
            )

