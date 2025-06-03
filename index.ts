import smtpService from './src/services/smtp-service';
import { CorrelatedRequestDTO, CorrelatedResponseDTO } from 'kafka-pkg';
import { DidSendEmailDTO, SendEmailDTO } from './src/types/email.dto';
import { EmailKafkaTopic } from './src/common/constants';

export function sendEmail(
  dto: CorrelatedRequestDTO<SendEmailDTO>,
  callback?: (response: CorrelatedResponseDTO<DidSendEmailDTO>) => void
): void {
  smtpService.sendEmail(dto, callback);
}

export {
  SendEmailDTO,
  DidSendEmailDTO,
  EmailKafkaTopic,
  CorrelatedRequestDTO,
  CorrelatedResponseDTO,
};
