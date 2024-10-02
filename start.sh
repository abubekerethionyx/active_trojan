#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Install Python dependencies from the root /requirements.txt
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Function to run Python backend with Uvicorn from app/main.py
start_python() {
  echo "Starting Python backend..."
  python app/main.py
}

# Function to run Node.js frontend from frontend/package.json
start_node() {
  echo "Installing Node.js dependencies in frontend..."
  cd frontend
  npm install

  echo "Starting Node.js frontend with Vite..."
  npm run dev
}

# Run both Python and Node.js servers in parallel
start_python &
start_node &
wait
