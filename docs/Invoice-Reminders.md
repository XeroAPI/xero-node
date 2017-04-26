The following examples explain the Invoice Reminders section of the SDK.  The API documentation on Invoice Reminders can be found [here](https://developer.xero.com/documentation/api/invoice-reminders).

### Supported functions

* Retrieve Invoice Reminder Setting

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the invoice reminders functions exists in the following place:

`client.core.invoiceReminders`

This helper contains the following functions:

* `getInvoiceReminders([options])`

### Retrieving Invoice Reminders

This example shows how to retrieve the Invoice Reminder settings.

```javascript

xeroClient.core.invoiceReminders.getInvoiceReminders()
   .then(function(invoiceReminders) {
      //We've got the Invoice Reminders
      invoiceReminders.forEach(function(reminder){
         //do something useful
         console.log(reminder.Enabled);
      });
   })
```