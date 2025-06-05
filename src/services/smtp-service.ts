import {
  CorrelatedRequestDTO,
  CorrelatedResponseDTO,
  CorrelatedKafkaRequest
} from 'kafka-pkg';

import { SendEmailDTO, DidSendEmailDTO, SendEmailDTOSchema } from '../types/email.dto';
import { EmailKafkaTopic } from '../common/constants';

class SmtpService {
  private correlatedKafkaRequest: CorrelatedKafkaRequest;

  constructor() {
    this.correlatedKafkaRequest = new CorrelatedKafkaRequest(EmailKafkaTopic.SendEmail);
  }

  async sendEmail(data: CorrelatedRequestDTO<SendEmailDTO>): Promise<CorrelatedResponseDTO<DidSendEmailDTO>> {
    SendEmailDTOSchema.parse(data);

    return await this.correlatedKafkaRequest.send(data) as CorrelatedResponseDTO<DidSendEmailDTO>;
  }
}

export default new SmtpService();
