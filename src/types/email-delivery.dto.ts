import { z } from 'zod';

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
  from: string;
  to: string[];
  subject: string;
}

export const SendEmailDTOSchema = z.object({
  from: z.string('from must be a string').min(1, 'from cannot be empty'),
  to: z.array(z.string().min(1, 'recipient email cannot be empty'), 'to must be an array').min(1, 'to must not be empty'),
  subject: z.string('subject must be a string').min(1, 'subject cannot be empty'),
  body: z.string('body must be a string').min(1, 'body cannot be empty'),
  attachments: z.record(z.string(), z.any()).optional(),
  inline: z.record(z.string(), z.any()).optional(),
  bcc: z.array(z.string().min(1, 'bcc email cannot be empty')).optional(),
  cc: z.array(z.string().min(1, 'cc email cannot be empty')).optional(),
  replyTo: z.string().optional(),
});
