"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailDTOSchema = void 0;
const zod_1 = require("zod");
exports.SendEmailDTOSchema = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.array(zod_1.z.string()),
    subject: zod_1.z.string(),
    body: zod_1.z.string(),
    attachments: zod_1.z.object({}).optional(),
    inline: zod_1.z.object({}).optional(),
    bcc: zod_1.z.array(zod_1.z.string()).optional(),
    cc: zod_1.z.array(zod_1.z.string()).optional(),
    replyTo: zod_1.z.string().optional(),
});
