# RemoteOK Mock Server

This is a simple **Express.js mock server** that returns a pre-saved API response (JSON).  
It is useful when the actual RemoteOK API is blocked by human verification or rate limits.

---

## 🚀 Setup

1. Clone this repository or create a new folder:
   ```
   mkdir api_mock_server
   cd api_mock_server
   ```
2. Initialize project and install dependencies:

   ````
   npm init -y
   npm install express cors nodemon```
   ````

3. Running the Server

   ```
   npm run dev
   ```

## Usage

API Endpoint:
http://localhost:5000/api

This will always return the contents of remoteok-response.json.

## 🚀 Run with Docker

1. Build the Docker image:
   ```bash
   docker build -t mock-server .
   ```
2. Run the container:
   ```
   docker run -p 3000:3000 mock-server
   ```
3. Or use Docker Compose:

   ```
   docker-compose up --build
   ```

Now your mock server will be available at:
👉 http://localhost:5000/api
