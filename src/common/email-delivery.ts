import { ZodError } from 'zod';

import { SendEmailDTO, SendEmailDTOSchema } from '../types/email.dto';

export function validateSendEmailDTO(data: SendEmailDTO): void {
  SendEmailDTOSchema.parse(data);
}
