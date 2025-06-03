import { CorrelatedRequestDTO, CorrelatedResponseDTO } from 'kafka-pkg';
import { DidSendEmailDTO, SendEmailDTO } from './src/types/email.dto';
import { EmailKafkaTopic } from './src/common/constants';
import { validateSendEmailDTO } from './src/common/email-delivery';
export declare function sendEmail(dto: CorrelatedRequestDTO<SendEmailDTO>, callback?: (response: CorrelatedResponseDTO<DidSendEmailDTO>) => void): void;
export { SendEmailDTO, DidSendEmailDTO, EmailKafkaTopic, CorrelatedRequestDTO, CorrelatedResponseDTO, validateSendEmailDTO };
