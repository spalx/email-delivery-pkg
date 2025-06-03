"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const kafka_pkg_1 = require("kafka-pkg");
const constants_1 = require("../common/constants");
class SmtpService {
    constructor() {
        this.callbacks = new Map();
        this.isSubscribedToKafka = false;
    }
    sendEmail(dto, callback) {
        this.subscribeToKafka();
        if (!dto.request_id) {
            dto.request_id = (0, uuid_1.v4)();
        }
        this.setCallback(dto.correlation_id, dto.request_id, callback);
        (0, kafka_pkg_1.sendCorrelatedRequestViaKafka)(constants_1.EmailKafkaTopic.SendEmail, dto);
    }
    subscribeToKafka() {
        if (this.isSubscribedToKafka) {
            return;
        }
        kafka_pkg_1.kafkaService.subscribe({
            [constants_1.EmailKafkaTopic.DidSendEmail]: this.handleDidSendEmail.bind(this),
        });
        this.isSubscribedToKafka = true;
    }
    async handleDidSendEmail(message) {
        const response = message;
        this.runCallback(response.correlation_id, response.request_id, response);
    }
    setCallback(correlationId, requestId, callback) {
        if (!callback) {
            return;
        }
        if (!this.callbacks.has(correlationId)) {
            this.callbacks.set(correlationId, new Map());
        }
        const innerMap = this.callbacks.get(correlationId);
        innerMap.set(requestId, callback);
    }
    runCallback(correlationId, requestId, response) {
        const innerMap = this.callbacks.get(correlationId);
        if (!innerMap) {
            return;
        }
        const callback = innerMap.get(requestId);
        if (callback) {
            callback(response);
            innerMap.delete(requestId);
        }
        if (innerMap.size === 0) {
            this.callbacks.delete(correlationId);
        }
    }
}
exports.default = new SmtpService();
