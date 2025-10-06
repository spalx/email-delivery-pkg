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
  to: z.array(z.string('each to must be a string').min(1, 'each to cannot be empty'), 'to must be an array').min(1, 'to must not be empty'),
  subject: z.string('subject must be a string').min(1, 'subject cannot be empty'),
  body: z.string('body must be a string').min(1, 'body cannot be empty'),
  attachments: z.record(z.string(), z.any()).optional(),
  inline: z.record(z.string(), z.any()).optional(),
  bcc: z.array(z.string('each bcc must be a string').min(1, 'each bcc cannot be empty'), 'bcc must be an array').optional(),
  cc: z.array(z.string('each cc must be a string').min(1, 'each cc cannot be empty'), 'cc must be an array').optional(),
  replyTo: z.string('replyTo must be a string').optional(),
});
