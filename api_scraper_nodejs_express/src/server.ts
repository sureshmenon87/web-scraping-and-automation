import app from "./app.js";
import { ENV } from "./utils/env.js";
import { logger } from "./logger/Logger.js";

const server = app.listen(ENV.PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${ENV.PORT}`);
});

const shutdown = (signal: string) => {
  logger.warn(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forcing shutdown after timeout");
    process.exit(1);
  }, 10_000).unref();
};

process.on("unhandledRejection", (reason: any) => {
  logger.error("Unhandled Rejection", { reason });
});
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", { error: err.message, stack: err.stack });
  shutdown("uncaughtException");
});

["SIGINT", "SIGTERM"].forEach((sig) =>
  process.on(sig as NodeJS.Signals, () => shutdown(sig))
);
