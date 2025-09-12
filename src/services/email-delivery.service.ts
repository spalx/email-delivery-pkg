import { v4 as uuidv4 } from 'uuid';
import { CorrelatedMessage, TransportAwareService, TransportAdapterName, transportService } from 'transport-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';

import { SendEmailDTO } from '../types/email-delivery.dto';
import { EmailDeliveryAction } from '../common/constants';

class EmailDeliveryService extends TransportAwareService implements IAppPkg {
  async init(): Promise<void> {
    //TODO: use service-discovery here
    this.useTransport(TransportAdapterName.HTTP, { host: 'email-delivery', port: 3040 });
  }

  getPriority(): number {
    return AppRunPriority.Highest;
  }

  async sendEmail(data: SendEmailDTO, correlationId?: string): Promise<void> {
    const message: CorrelatedMessage = CorrelatedMessage.create(
      correlationId || uuidv4(),
      EmailDeliveryAction.SendEmail,
      this.getActiveTransport(),
      data
    );

    await transportService.send(message, this.getActiveTransportOptions());
  }
}

export default new EmailDeliveryService();
