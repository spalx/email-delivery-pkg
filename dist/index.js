"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrelatedKafkaResponse = exports.EmailKafkaTopic = void 0;
exports.sendEmail = sendEmail;
const kafka_pkg_1 = require("kafka-pkg");
Object.defineProperty(exports, "CorrelatedKafkaResponse", { enumerable: true, get: function () { return kafka_pkg_1.CorrelatedKafkaResponse; } });
const smtp_service_1 = __importDefault(require("./src/services/smtp-service"));
async function sendEmail(data) {
    return await smtp_service_1.default.sendEmail(data);
}
var constants_1 = require("./src/common/constants");
Object.defineProperty(exports, "EmailKafkaTopic", { enumerable: true, get: function () { return constants_1.EmailKafkaTopic; } });
