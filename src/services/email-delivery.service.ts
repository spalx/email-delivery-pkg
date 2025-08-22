import { v4 as uuidv4 } from 'uuid';
import { CorrelatedResponseDTO, TransportAwareService, transportService } from 'transport-pkg';
import { throwErrorForStatus } from 'rest-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';

import { SendEmailDTO, DidSendEmailDTO } from '../types/email-delivery.dto';
import { EmailDeliveryAction } from '../common/constants';

class EmailDeliveryService extends TransportAwareService implements IAppPkg {
  async init(): Promise<void> {
    transportService.transportsSend([EmailDeliveryAction.SendEmail]);
  }

  getPriority(): number {
    return AppRunPriority.Highest;
  }

  async sendEmail(data: SendEmailDTO, correlationId?: string): Promise<DidSendEmailDTO> {
    const response: CorrelatedResponseDTO<DidSendEmailDTO> = await transportService.send(
      {
        action: EmailDeliveryAction.SendEmail,
        data,
        correlation_id: correlationId || uuidv4(),
        transport_name: this.getActiveTransport()
      },
      this.getActiveTransportOptions()
    );

    if (response.status !== 0) {
      throwErrorForStatus(response.status, response.error || '');
    }

    return response.data as DidSendEmailDTO;
  }
}

export default new EmailDeliveryService();
