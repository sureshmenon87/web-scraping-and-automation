import * as XLSX from "xlsx";
import fs from "fs";

export class ExcelService {
  outputJobsToXls(
    data: any[],
    filename: string = "remote_jobs.xls"
  ): string | null {
    if (!data || data.length === 0) {
      console.warn("[WARNING] No data to write into Excel.");
      return null;
    }

    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Jobs");

      XLSX.writeFile(wb, filename);
      return filename;
    } catch (err) {
      console.error("[ERROR] Failed to write jobs to Excel:", err);
      return null;
    }
  }
}
