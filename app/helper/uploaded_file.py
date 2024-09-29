import shutil

from fastapi import UploadFile


def save_uploaded_file(uploaded_file: UploadFile, destination_path: str):
    try:
        with open(destination_path, "wb") as buffer:
            shutil.copyfileobj(uploaded_file.file, buffer)
    finally:
        uploaded_file.file.close()
