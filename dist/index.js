"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSendEmailDTO = exports.EmailKafkaTopic = void 0;
exports.sendEmail = sendEmail;
const smtp_service_1 = __importDefault(require("./src/services/smtp-service"));
const constants_1 = require("./src/common/constants");
Object.defineProperty(exports, "EmailKafkaTopic", { enumerable: true, get: function () { return constants_1.EmailKafkaTopic; } });
const email_delivery_1 = require("./src/common/email-delivery");
Object.defineProperty(exports, "validateSendEmailDTO", { enumerable: true, get: function () { return email_delivery_1.validateSendEmailDTO; } });
function sendEmail(dto, callback) {
    smtp_service_1.default.sendEmail(dto, callback);
}
