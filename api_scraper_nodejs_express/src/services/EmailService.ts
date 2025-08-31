import nodemailer from "nodemailer";
import fs from "fs";
import { ENV } from "../utils/env.js";
import { logger } from "../logger/Logger.js";
import { AppError } from "../errors/AppError.js";

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: false,
    auth: { user: ENV.SMTP_USER, pass: ENV.SMTP_PASS },
  });

  async verify(): Promise<void> {
    try {
      await this.transporter.verify();
      logger.info("SMTP transporter verified");
    } catch (e: any) {
      throw new AppError(`SMTP verification failed: ${e.message}`, 500);
    }
  }

  async sendEmail(
    from: string,
    to: string[],
    subject: string,
    text: string,
    files: string[] = []
  ): Promise<void> {
    if (!ENV.SMTP_USER) throw new AppError("SMTP_USER_NAME not provided", 500);

    const attachments = files
      .filter((f) => fs.existsSync(f))
      .map((f) => ({ filename: f.split("/").pop(), path: f }));

    try {
      await this.transporter.sendMail({ from, to, subject, text, attachments });
      logger.info("Email sent", {
        to,
        subject,
        attachments: attachments.map((a) => a.filename),
      });
    } catch (e: any) {
      throw new AppError(`Failed to send email: ${e.message}`, 502);
    }
  }
}
