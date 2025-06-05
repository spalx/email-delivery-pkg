"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_pkg_1 = require("kafka-pkg");
const email_dto_1 = require("../types/email.dto");
const constants_1 = require("../common/constants");
class SmtpService {
    constructor() {
        this.correlatedKafkaRequest = new kafka_pkg_1.CorrelatedKafkaRequest(constants_1.EmailKafkaTopic.SendEmail);
    }
    async sendEmail(data) {
        email_dto_1.SendEmailDTOSchema.parse(data);
        return await this.correlatedKafkaRequest.send(data);
    }
}
exports.default = new SmtpService();
