import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  const data = fs.readFileSync("remoteok-response.json", "utf8");
  res.json(JSON.parse(data));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Mock server running at http://localhost:${PORT}/api`);
});
