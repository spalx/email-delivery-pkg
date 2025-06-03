# email-delivery-pkg

Package which enables to connect to the email-delivery service easily, releasing the need of connecting to the respective Kafka topics.

## Dependencies

This service depends on kafka-pkg repository.

---

## Functions

| Function | Argument Types | Returns | Description |
| - | - | - | - |
| `sendEmail(dto, callback?)` | `dto: CorrelatedRequestDTO<SendEmailDTO>`,<br>`callback?: (response: CorrelatedResponseDTO<DidSendEmailDTO>) => void` | `void`  | Sends an email via Kafka and optionally registers a callback for response |
| `validateSendEmailDTO(data)` | `data: SendEmailDTO` | `void` | Validates the data and throws an error when validation fails |

---

## DTO Interfaces

### SendEmailDTO interface

| Key | Type | Notes |
| - | - | - |
| from | string | Sender address |
| to | string[] | One or more recipient addresses |
| subject | string | Email subject line |
| body | string | HTML content of the email |
| attachments | Record\<string, Blob\>, optional | Filename→Blob map for attachments |
| inline | Record\<string, Blob\>, optional | Filename→Blob map for inline images |
| cc | string[], optional | CC email addresses |
| bcc | string[], optional | BCC email addresses |
| replyTo | string, optional | Reply-To header address |


### DidSendEmailDTO interface

| Key | Type | Possible values |
| - | - | - |
| to | string[] | |
| subject | string | |

### CorrelatedResponseDTO\<T\> interface

Check kafka-pkg repository for details.


### CorrelatedRequestDTO\<T\> interface

Check kafka-pkg repository for details.

---

## Imports

```ts
import {
  sendEmail,
  SendEmailDTO,
  DidSendEmailDTO,
  EmailKafkaTopic,
  validateSendEmailDTO
} from 'email-delivery-pkg';
```
