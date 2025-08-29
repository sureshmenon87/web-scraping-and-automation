import requests
import sys
import os
import xlwt 
from xlwt import Workbook
import smtplib
from os.path import basename
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate

BASE_URL = 'https://remoteok.com/api'
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
REQ_HEADER = {
  'User-Agent':USER_AGENT,
  'Accept-Language': 'en-US, en;q=0.5'
}


def get_job_postings():
  """
  Fetch job postings from the RemoteOK API.

  Returns:
      list: A list of job postings parsed from the API response.
  """
  try:
    res = requests.get(url=BASE_URL,headers=REQ_HEADER)
    res.raise_for_status()
    data = res.json()
    print(data)
    if isinstance(data, list):
      return data
    else:
      print("Unexpected response format.")
      return []
  except requests.exceptions.RequestException as e:
    print(f"[ERROR] failed to fetch job postings: {e}")
    return []  


def send_email(send_from, send_to, subject, text, files = None):
  """
  Send an email with the given subject and text content to recipients.

  Args:
      send_from (str): Sender email address.
      send_to (list): List of recipient email addresses.
      subject (str): Email subject line.
      text (str): Email body content.
      files (list, optional): Attachments to include in the email.

  Returns:
      None
  """
  try:

    assert isinstance(send_to, list)
    msg = MIMEMultipart()
    msg['From'] = send_from
    msg['To'] = COMMASPACE.join(send_to)
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = subject
    msg.attach(MIMEText(text))
    for f in files or []:
      try:
        password = os.getenv("SMTP_PASSWORD")
        if not password:
          raise ValueError("SMTP password not provided (argument or env var 'SMTP_PASSWORD').")
        

        with open(f, "rb") as file:
          part = MIMEApplication(file.read(), Name=basename(f))
          part['Content-Disposition']= f'attachment; filename="{basename(f)}"'
          msg.attach(part)
      except FileNotFoundError:
       print(f"[WARNING] Attachment not found: {f}")
      

    smtp = smtplib.SMTP('smtp.gmail.com:587')
    smtp.starttls()
    smtp.login(send_from,password)
    smtp.sendmail(send_from, send_to, msg.as_string())
    smtp.close()
  except smtplib.SMTPAuthenticationError:
    print("[ERROR] Authentication failed. Check your email/password or app password.")
  except smtplib.SMTPException as e:
     print(f"[ERROR] Failed to send email: {e}")
  except Exception as e:
    print(f"[Error] Unexpected error while sending email: {e}")






def output_jobs_to_xls(data):
  """
  Export job postings to an Excel file for offline use.

  Args:
      data (list): List of job postings to write into XLS format.

  Returns:
      None
  """
  try:
    if not data:
      print("[WARNING] No data to write into Excel.")
      return None
    wb = Workbook()
    job_sheet = wb.add_sheet('Jobs')
    headers = list(data[0].keys())
    for i in range(0,len(headers)):
      job_sheet.write(0,i, headers[i])
    
    for i in range(0,len(data)):
      job = data[i]
      values = list(job.values())
      for x in range (0,len(values)):
        job_sheet.write(i+1,x,values[x])
    wb.save('remote_jobs.xls')
  except Exception as e:
    print(f"[ERROR] Failed to write jobs to Excel: {e}")
    return None



def main():
  """
    Main entry point of the script.

    Steps:
      1. Fetch job postings from the API.
      2. Optionally save the data to Excel.
      3. Send the job list via email to recipients.
  """
  jobs = get_job_postings()[1:]
  if not jobs:   # Graceful exit if no jobs
    print("No job postings available. Exiting gracefully.")
    sys.exit(0)

  output_jobs_to_xls(json)
  send_from = os.getenv("SMTP_USER_NAME")
  if not send_from:
            raise ValueError("SMTP_USER_NAME not provided (argument or env var 'SMTP_USER_NAME').")
  
  send_email(send_from,['sureshmenon87@gmail.com'],
             'Jobs Posting','PFA the list of jobs posting to this email', files=['remote_jobs.xls'])

if __name__ == "__main__":
  main()
