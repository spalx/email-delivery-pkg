import { CorrelatedRequestDTO, CorrelatedResponseDTO } from 'kafka-pkg';
import { SendEmailDTO, DidSendEmailDTO } from '../types/email.dto';
type Callback = (response: CorrelatedResponseDTO<DidSendEmailDTO>) => void;
declare class SmtpService {
    private callbacks;
    private isSubscribedToKafka;
    sendEmail(dto: CorrelatedRequestDTO<SendEmailDTO>, callback?: Callback): void;
    private subscribeToKafka;
    private handleDidSendEmail;
    private setCallback;
    private runCallback;
}
declare const _default: SmtpService;
export default _default;
