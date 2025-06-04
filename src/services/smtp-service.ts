import { v4 as uuidv4 } from 'uuid';
import {
  CorrelatedRequestDTO,
  CorrelatedResponseDTO,
  kafkaService,
  sendCorrelatedRequestViaKafka,
} from 'kafka-pkg';

import { SendEmailDTO, DidSendEmailDTO } from '../types/email.dto';
import { EmailKafkaTopic } from '../common/constants';

type Callback = (response: CorrelatedResponseDTO<DidSendEmailDTO>) => void;

class SmtpService {
  private callbacks: Map<string, Map<string, Callback>> = new Map();

  constructor() {
    kafkaService.subscribe({
      [EmailKafkaTopic.DidSendEmail]: this.handleDidSendEmail.bind(this),
    });
  }

  sendEmail(
    dto: CorrelatedRequestDTO<SendEmailDTO>,
    callback?: Callback
  ): void {
    if (!dto.request_id) {
      dto.request_id = uuidv4();
    }

    this.setCallback(dto.correlation_id, dto.request_id, callback);

    sendCorrelatedRequestViaKafka(EmailKafkaTopic.SendEmail, dto);
  }

  private async handleDidSendEmail(message: object): Promise<void> {
    const response = message as CorrelatedResponseDTO<DidSendEmailDTO>;

    this.runCallback(response.correlation_id, response.request_id, response);
  }

  private setCallback(correlationId: string, requestId: string, callback?: Callback): void {
    if (!callback) {
      return;
    }

    if (!this.callbacks.has(correlationId)) {
      this.callbacks.set(correlationId, new Map());
    }

    const innerMap = this.callbacks.get(correlationId)!;
    innerMap.set(requestId, callback);
  }

  private runCallback(correlationId: string, requestId: string, response: CorrelatedResponseDTO<DidSendEmailDTO>): void {
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

export default new SmtpService();
