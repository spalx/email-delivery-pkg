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
export declare const SendEmailDTOSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodArray<z.ZodString, "many">;
    subject: z.ZodString;
    body: z.ZodString;
    attachments: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    inline: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    bcc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cc: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    replyTo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    from: string;
    to: string[];
    subject: string;
    body: string;
    attachments?: {} | undefined;
    inline?: {} | undefined;
    bcc?: string[] | undefined;
    cc?: string[] | undefined;
    replyTo?: string | undefined;
}, {
    from: string;
    to: string[];
    subject: string;
    body: string;
    attachments?: {} | undefined;
    inline?: {} | undefined;
    bcc?: string[] | undefined;
    cc?: string[] | undefined;
    replyTo?: string | undefined;
}>;
