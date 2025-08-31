# 🛠️ Node.js API Scraping Service

A Node.js api scraper service for fetching and processing job postings.  
Built with **Express** and **Axios**, following modern Node.js practices.

---

## 🚀 Features

- Fetch job postings from external APIs.
- Gracefully handles errors and empty responses.
- Provides REST API endpoints for job data.
- Easily extensible for adding new sources.

---

## 📦 Installation

1. Clone the repository:

   ```

   git clone https://github.com/sureshmenon87/web-scraping-and-automation.git
   cd api_scraper_nodejs_express
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Service

Local (development)

```
npm run dev
```

## Production

```
npm run build

```

```
npm start

```

Service will be available at:
👉 http://localhost:3000

## Run with Docker

1. Build Docker image:

```
docker build -t nodejs-api-scraper .
```

2. Run container:

```
docker run -p 3000:3000 nodejs-api-scraper

```
