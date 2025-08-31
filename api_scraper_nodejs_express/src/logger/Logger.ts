import { createLogger, format, transports } from "winston";
import { ENV } from "../utils/env.js";

const { combine, timestamp, printf, colorize, json, errors } = format;

const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const base = `${timestamp} ${level}: ${message}`;
  const rest = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return stack ? `${base}\n${stack}${rest}` : `${base}${rest}`;
});

export const logger = createLogger({
  level: ENV.LOG_LEVEL,
  format: combine(
    errors({ stack: true }),
    timestamp(),
    ENV.NODE_ENV === "production"
      ? json()
      : combine(colorize({ all: true }), devFormat)
  ),
  transports: [
    new transports.Console(),
    /* new transports.File({
      filename: `${ENV.LOG_DIR}/error.log`,
      level: "error",
      maxsize: 5_000_000,
      maxFiles: 3,
    }),
    new transports.File({
      filename: `${ENV.LOG_DIR}/combined.log`,
      maxsize: 10_000_000,
      maxFiles: 5,
    }),*/
  ],
  exitOnError: false,
});
