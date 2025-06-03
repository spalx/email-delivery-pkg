"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSendEmailDTO = validateSendEmailDTO;
const email_dto_1 = require("../types/email.dto");
function validateSendEmailDTO(data) {
    email_dto_1.SendEmailDTOSchema.parse(data);
}
