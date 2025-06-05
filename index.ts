import { CorrelatedRequestDTO, CorrelatedResponseDTO, CorrelatedKafkaResponse } from 'kafka-pkg';

import smtpService from './src/services/smtp-service';
import { DidSendEmailDTO, SendEmailDTO } from './src/types/email.dto';

export async function sendEmail(data: CorrelatedRequestDTO<SendEmailDTO>): Promise<CorrelatedResponseDTO<DidSendEmailDTO>> {
  return await smtpService.sendEmail(data);
}

export { EmailKafkaTopic } from './src/common/constants';
export {
  SendEmailDTO,
  DidSendEmailDTO,
  CorrelatedRequestDTO,
  CorrelatedResponseDTO,
  CorrelatedKafkaResponse
};
