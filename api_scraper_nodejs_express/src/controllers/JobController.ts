import type { Request, Response } from "express";
import { JobService } from "../services/JobService.js";
import { ExcelService } from "../services/ExcelService.js";
import { EmailService } from "../services/EmailService.js";
import { ENV } from "../utils/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../errors/AppError.js";

export class JobController {
  private jobService = new JobService();
  private excelService = new ExcelService();
  private emailService = new EmailService();

  fetchAndSendJobs = asyncHandler(async (_req: Request, res: Response) => {
    const jobs = await this.jobService.getJobPostings();
    const jobData = jobs.slice(1);

    if (!jobData.length) {
      throw new AppError("No job postings found", 404);
    }

    const filePath = this.excelService.outputJobsToXls(jobData);
    if (!filePath) {
      throw new AppError("Failed to generate Excel file", 500);
    }

    await this.emailService.verify();
    await this.emailService.sendEmail(
      ENV.SMTP_USER,
      ["sureshmenon87@gmail.com"],
      "Job Postings",
      "PFA the list of job postings.",
      [filePath]
    );

    res.json({ message: "Jobs fetched, Excel generated, Email sent" });
  });
}
