# SQL Query API

This project provides a FastAPI application for executing SQL queries against a MySQL database. The application accepts SQL queries via a POST request and returns the results in JSON format.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.11 or later
- MySQL server
- pip (Python package installer)

You will also need to have a `.env` file in the root of your project with the variables values filled.
if you want to populate the sample .csv file to mysql database
 - setup mysql server
 - run python .\app\helper\populate_db.py
## Installation
- python -m venv venv
- On Windows use `venv\Scripts\activate`
- pip install -r requirements.txt
- python app/main.py