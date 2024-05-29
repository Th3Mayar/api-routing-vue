# API Routing Vue Documentation

## Overview

The **API Routing Vue** is a RESTful API built with Express.js and MongoDB. It provides endpoints to interact with a MongoDB database, specifically designed to handle messages. This documentation outlines the available endpoints, their purposes, and the expected request and response formats.

## Base URL

http://localhost:PORT


Replace `PORT` with the port number where the server is running. If `PORT` is not provided in the environment variables, the default port is `3000`.

## Endpoints

### 1. GET /

- **Description:** 
  - Retrieves a simple greeting message from the server.

- **Request:**
  - Method: GET
  - Endpoint: `/`
  - Headers: None
  - Body: None

- **Response:**
  - Status Code: 200 OK
  - Body:
    
    ```json
    {
      "message": "Hello from server!"
    }
    ```

### 2. GET /messages

- **Description:** 
  - Retrieves all messages stored in the MongoDB database.

- **Request:**
  - Method: GET
  - Endpoint: `/messages`
  - Headers: None
  - Body: None

- **Response:**
  - Status Code: 200 OK
  - Body: Array of message objects
    
    ```json
    [
      {
        "_id": "ObjectId",
        "email": "string",
        "message": "string",
        "createdAt": "Date"
      },
      {
        "_id": "ObjectId",
        "email": "string",
        "message": "string",
        "createdAt": "Date"
      },
      ...
    ]
    ```

### 3. POST /messages

- **Description:** 
  - Stores a new message in the MongoDB database.

- **Request:**
  - Method: POST
  - Endpoint: `/messages`
  - Headers:
    - Content-Type: application/json
  - Body:
    
    ```json
    {
      "email": "string",
      "message": "string"
    }
    ```

- **Response:**
  - Status Code: 200 OK
  - Body:
    
    ```json
    {
      "message": "Data received and saved successfully",
      "data": "ObjectId"
    }
    ```

  - Status Code: 500 Internal Server Error
  - Body:
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

## Error Handling

- If any error occurs during processing, the server responds with a status code of `500` and a JSON object containing an error message.
- Error messages are informative and help identify the issue.

## Authentication

This API does not implement authentication mechanisms. Ensure to implement appropriate security measures when deploying it in production environments.

## Additional Notes

- Ensure the MongoDB URI is properly configured in the environment variables.
- The API assumes a MongoDB database named `form-Data-vue` with a collection named `messages`. Adjust these configurations as per your MongoDB setup.
- For development purposes, certificate validation is disabled, and the server selection timeout is increased. Ensure to adjust these settings for production deployments.

This concludes the documentation for the **API Routing Vue**. If you have any further questions or need assistance, please refer to the provided contact information.

Create by Th3Mayar (Jose Fco. Henriquez)
