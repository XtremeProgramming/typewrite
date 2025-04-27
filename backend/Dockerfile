# Use the official Python image
FROM python:3.11-slim

# Install some system dependencies (useful for PostgreSQL connection)
RUN apt-get update && apt-get install -y gcc libpq-dev

# Create the working directory
WORKDIR /app

# Copy the dependency files first
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the project code
COPY . .

# Expose the port that FastAPI will use (usually 8000)
EXPOSE 8000

# Command to run the Uvicorn server (ASGI server for FastAPI)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
