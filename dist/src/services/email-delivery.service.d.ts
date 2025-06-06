import { CorrelatedRequestDTO, CorrelatedResponseDTO } from 'kafka-pkg';
import { IAppPkg } from 'app-life-cycle-pkg';
import { SendEmailDTO, DidSendEmailDTO } from '../types/email-delivery.dto';
declare class EmailDeliveryService implements IAppPkg {
    private correlatedKafkaRequest;
    init(): Promise<void>;
    sendEmail(data: CorrelatedRequestDTO<SendEmailDTO>): Promise<CorrelatedResponseDTO<DidSendEmailDTO>>;
}
declare const _default: EmailDeliveryService;
export default _default;
