import axios from "axios";
import { logger } from "../logger/Logger.js";
import { ENV } from "../utils/env.js";

export class JobService {
  private readonly REQ_HEADER = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",

    Accept: "application/json,text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
  };

  async getJobPostings(): Promise<any[]> {
    try {
      const res = await axios.get(ENV.API_URL, {
        headers: this.REQ_HEADER,
        timeout: 15000,
      });
      if (Array.isArray(res.data)) {
        logger.info(`Fetched ${res.data.length} raw items from RemoteOK`);
        return res.data;
      }
      logger.warn("Unexpected response format from RemoteOK");
      return [];
    } catch (err: any) {
      console.log(err.response?.headers);
      console.log(err.response?.data);

      console.error("Error:", err.response?.status, err.response?.data);
      logger.error("Failed to fetch job postings", { error: err.message });
      return [];
    }
  }
}
