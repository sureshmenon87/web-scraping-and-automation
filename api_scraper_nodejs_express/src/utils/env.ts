import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const LOG_DIR = process.env.LOG_DIR || "logs";
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3000,

  SMTP_USER: process.env.SMTP_USER_NAME || "",
  API_URL: process.env.API_URL || "",
  SMTP_PASS: process.env.SMTP_PASSWORD || "",
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,

  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  LOG_DIR,
};
