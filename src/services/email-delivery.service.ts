import { v4 as uuidv4 } from 'uuid';
import { CorrelatedMessage, TransportAwareService, TransportAdapterName, transportService, CircuitBreaker } from 'transport-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';
import { serviceDiscoveryService, ServiceDTO } from 'service-discovery-pkg';

import { SendEmailDTO } from '../types/email-delivery.dto';
import { EmailDeliveryAction, SERVICE_NAME } from '../common/constants';

class EmailDeliveryService extends TransportAwareService implements IAppPkg {
  private sendBreaker: CircuitBreaker<[CorrelatedMessage, Record<string, unknown>], CorrelatedMessage>;

  constructor() {
    super();

    this.sendBreaker = new CircuitBreaker<[CorrelatedMessage, Record<string, unknown>], CorrelatedMessage>(
      (req, options) => transportService.send(req, options),
      {
        timeout: 2000,
        errorThresholdPercentage: 50,
        retryTimeout: 5000,
      }
    );
  }

  async init(): Promise<void> {
    const service: ServiceDTO = await serviceDiscoveryService.getService(SERVICE_NAME);

    this.useTransport(TransportAdapterName.HTTP, { host: service.host, port: service.port });
  }

  getPriority(): number {
    return AppRunPriority.Medium;
  }

  getName(): string {
    return 'email-delivery';
  }

  getDependencies(): IAppPkg[] {
    return [
      transportService,
      serviceDiscoveryService
    ];
  }

  async sendEmail(data: SendEmailDTO, correlationId?: string): Promise<void> {
    const message: CorrelatedMessage = CorrelatedMessage.create(
      correlationId || uuidv4(),
      EmailDeliveryAction.SendEmail,
      this.getActiveTransport(),
      data
    );

    await this.sendBreaker.exec(message, this.getActiveTransportOptions());
  }
}

export default new EmailDeliveryService();
