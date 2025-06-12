# email-delivery-pkg

Package which enables to connect to the email-delivery service easily, releasing the need of connecting to the respective Kafka topics.

## Dependencies

This package depends on the following packages:

[app-life-cycle-pkg](https://github.com/spalx/app-life-cycle-pkg)<br>
[kafka-pkg](https://github.com/spalx/kafka-pkg)

## emailDeliveryService

Instance of `EmailDeliveryService` used for sending emails.<br>
Since this service implements the IAppPkg interface, the recommended way of using it is by registering it in your app initialization script like this:

```ts
// appService is an instance of AppService (app-life-cycle-pkg)
appService.use(emailDeliveryService);
```

### emailDeliveryService methods

| Function | Argument Types | Returns | Description |
| - | - | - | - |
| `sendEmail(data)` | `data: CorrelatedRequestDTO<SendEmailDTO>` | `Promise<CorrelatedResponseDTO<DidSendEmailDTO>>`  | Sends an email via kafka and returns the response |

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

### CorrelatedRequestDTO\<T\> interface

Check kafka-pkg repository for details.

### CorrelatedResponseDTO\<T\> interface

Check kafka-pkg repository for details.

---

## Imports

```ts
import {
  emailDeliveryService,
  SendEmailDTO,
  DidSendEmailDTO,
  EmailKafkaTopic
} from 'email-delivery-pkg';
```
