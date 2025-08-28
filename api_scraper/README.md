# RemoteOK API Scraper & Email Notifier

This project demonstrates how to fetch job listings from the [RemoteOK API](https://remoteok.com/api), parse the response, and send the results via email to specified recipients.  
It is built in **Python** and can be extended for any API scraping or automation use case.

---

## 🚀 Features

- Fetches data from the `https://remoteok.com/api` endpoint
- Parses JSON response to extract job details (e.g., position, company, URL)
- Sends job listings via email (SMTP)
- Easy to configure recipients and email settings
- Lightweight and extendable for other APIs

---

## 🛠️ Tech Stack

- **Python 3.13.2**
- `requests` – for API calls
- `smtplib` / `email.mime` – for sending emails
- `json` – for parsing API responses

---

# Job Postings Project

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sureshmenon87/python_api_scraper.git
cd python_api_scraper

```

### 2. Linux / macOS

```
python -m venv venv

source venv/bin/activate
```

### 2. Windows (Command Prompt)

```
python -m venv venv

venv\Scripts\activate
```

### 3. Install dependencies

```
pip install -r requirements.txt

```

### 4.Run the project

```
python remoteok_scraper.py

```

If you update dependencies later, don’t forget to regenerate requirements.txt:

```
pip freeze > requirements.txt
```
