"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_pkg_1 = require("kafka-pkg");
const email_delivery_dto_1 = require("../types/email-delivery.dto");
const constants_1 = require("../common/constants");
class EmailDeliveryService {
    constructor() {
        this.correlatedKafkaRequest = null;
    }
    async init() {
        if (!this.correlatedKafkaRequest) {
            this.correlatedKafkaRequest = new kafka_pkg_1.CorrelatedKafkaRequest(constants_1.EmailDeliveryKafkaTopic.SendEmail);
        }
    }
    async sendEmail(data) {
        if (!this.correlatedKafkaRequest) {
            throw new Error('Email delivery service not initialized');
        }
        email_delivery_dto_1.SendEmailDTOSchema.parse(data.data);
        return await this.correlatedKafkaRequest.send(data);
    }
}
exports.default = new EmailDeliveryService();
