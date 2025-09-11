import { v4 as uuidv4 } from 'uuid';
import { CorrelatedMessage, TransportAwareService, transportService } from 'transport-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';

import { SendEmailDTO } from '../types/email-delivery.dto';
import { EmailDeliveryAction } from '../common/constants';

class EmailDeliveryService extends TransportAwareService implements IAppPkg {
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
