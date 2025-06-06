import {
  CorrelatedRequestDTO,
  CorrelatedResponseDTO,
  CorrelatedKafkaRequest
} from 'kafka-pkg';
import { IAppPkg } from 'app-life-cycle-pkg';

import { SendEmailDTO, DidSendEmailDTO, SendEmailDTOSchema } from '../types/email-delivery.dto';
import { EmailDeliveryKafkaTopic } from '../common/constants';

class EmailDeliveryService implements IAppPkg {
  private correlatedKafkaRequest: CorrelatedKafkaRequest | null = null;

  async init(): Promise<void> {
    if (!this.correlatedKafkaRequest) {
      this.correlatedKafkaRequest = new CorrelatedKafkaRequest(EmailDeliveryKafkaTopic.SendEmail);
    }
  }

  async sendEmail(data: CorrelatedRequestDTO<SendEmailDTO>): Promise<CorrelatedResponseDTO<DidSendEmailDTO>> {
    if (!this.correlatedKafkaRequest) {
      throw new Error('Email delivery service not initialized');
    }

    SendEmailDTOSchema.parse(data.data);

    return await this.correlatedKafkaRequest.send(data) as CorrelatedResponseDTO<DidSendEmailDTO>;
  }
}

export default new EmailDeliveryService();
