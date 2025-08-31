import express from "express";
import { JobController } from "./controllers/JobController.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
const jobController = new JobController();

app.use(express.json());
app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: Date.now() });
});

app.get("/jobs", jobController.fetchAndSendJobs);

app.use(notFound);
app.use(errorHandler);

export default app;
