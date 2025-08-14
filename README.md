# email-delivery-pkg

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
| `sendEmail(data)` | `data: CorrelatedRequestDTO<SendEmailDTO>` | `Promise<DidSendEmailDTO>`  | Sends an email and returns the response |

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

---

## Imports

```ts
import {
  emailDeliveryService,
  SendEmailDTO,
  DidSendEmailDTO
} from 'email-delivery-pkg';
```
