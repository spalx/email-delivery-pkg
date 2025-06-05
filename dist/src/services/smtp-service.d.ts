import { CorrelatedRequestDTO, CorrelatedResponseDTO } from 'kafka-pkg';
import { SendEmailDTO, DidSendEmailDTO } from '../types/email.dto';
declare class SmtpService {
    private correlatedKafkaRequest;
    constructor();
    sendEmail(data: CorrelatedRequestDTO<SendEmailDTO>): Promise<CorrelatedResponseDTO<DidSendEmailDTO>>;
}
declare const _default: SmtpService;
export default _default;
