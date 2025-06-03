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
  to: string[];
  subject: string;
}

export const SendEmailDTOSchema = z.object({
  from: z.string(),
  to: z.array(z.string()),
  subject: z.string(),
  body: z.string(),
  attachments: z.object({}).optional(),
  inline: z.object({}).optional(),
  bcc: z.array(z.string()).optional(),
  cc: z.array(z.string()).optional(),
  replyTo: z.string().optional(),
});
