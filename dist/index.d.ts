import { CorrelatedRequestDTO, CorrelatedResponseDTO, CorrelatedKafkaResponse } from 'kafka-pkg';
import { DidSendEmailDTO, SendEmailDTO } from './src/types/email.dto';
export declare function sendEmail(data: CorrelatedRequestDTO<SendEmailDTO>): Promise<CorrelatedResponseDTO<DidSendEmailDTO>>;
export { EmailKafkaTopic } from './src/common/constants';
export { SendEmailDTO, DidSendEmailDTO, CorrelatedRequestDTO, CorrelatedResponseDTO, CorrelatedKafkaResponse };
