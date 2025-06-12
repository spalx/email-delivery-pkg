export interface SendEmailDTO {
  from: string;
  to: string[];
  subject: string;
  body: string;
  attachments?: Record<string, Blob>;
  inline?: Record<string, Blob>;
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
}

export interface DidSendEmailDTO {
  to: string[];
  subject: string;
}
