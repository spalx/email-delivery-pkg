import { v4 as uuidv4 } from 'uuid';
import { CorrelatedMessage, TransportAwareService, TransportAdapterName, transportService } from 'transport-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';
import { serviceDiscoveryService, ServiceDTO } from 'service-discovery-pkg';

import { SendEmailDTO } from '../types/email-delivery.dto';
import { EmailDeliveryAction, SERVICE_NAME } from '../common/constants';

class EmailDeliveryService extends TransportAwareService implements IAppPkg {
  async init(): Promise<void> {
    const service: ServiceDTO = await serviceDiscoveryService.getService(SERVICE_NAME);

    this.useTransport(TransportAdapterName.HTTP, { host: service.host, port: service.port });
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
