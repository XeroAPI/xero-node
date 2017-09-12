The following examples explain the Attachments section of the SDK.  The API documentation on Attachments can be found [here](https://developer.xero.com/documentation/api/attachments).

### Supported functions

* Create New Attachments
* Attach to Entity
* Retrieve Attachments
* Update Attachments

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the attachments functions exists in the following place:

`client.core.attachments`

This helper contains the following functions:

* `newAttachment(data[, options])`
* `getAttachments([options])`
* `getContent(attachment, writestream)`

The `Attachment` object also provides the following method:

* `getContent(writestream)`
* `save(ownerpath, data[, stream, options])`

### Creating a new attachment using a file stream (recommended)

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var data = {
    FileName: "file.pdf",
    MimeType: "application/pdf"
};

var filePath = "/path/to/some/file.pdf";
var fileReadStream = fs.createReadStream(filePath);
var attachmentObj = xeroClient.core.attachments.newAttachment(data);

//Retrieve some entity to add the attachment to (e.g. Invoices)
xeroClient.core.invoices.getInvoice(sampleInvoiceID)
    .then(function(invoice){
        attachmentPlaceholder.save("Invoices/" + invoice.InvoiceID, fileReadStream, true)
          .then(function(attachments){
              //Attachment has been created 
              var myAttachment = attachments.entities[0];
          })
    })
```

Some points to note with the code snippet above:

* The `.newAttachment()` function doesn't actually make any API call to Xero.  It only creates an object according to the attachment schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Options / IncludeOnline

The options parameter currently only supports one field `IncludeOnline`.  This can be used on accounts receivable invoices to choose whether the attachment should or should not be available on the Online Invoice.

This parameter defaults to `false` if not provided.

```javascript
attachmentPlaceholder.save("Invoices/" + invoice.InvoiceID, filePath, false, {IncludeOnline: true})
    .then(function(attachments){
        //Attachment has been created 
        var myAttachment = attachments.entities[0];
    })
```

### Creating a new attachment using a file reference

This method works, but it is not recommended as it requires the entire attachment to be loaded into memory and passed around.  The streaming method is far more efficient.

```javascript

var data = {
    FileName: "file.pdf",
    MimeType: "application/pdf"
};

var filePath = "/path/to/some/file.pdf";
var attachmentObj = xeroClient.core.attachments.newAttachment(data);

//Retrieve some entity to add the attachment to (e.g. Invoices)
xeroClient.core.invoices.getInvoice(sampleInvoiceID)
    .then(function(invoice){
        attachmentPlaceholder.save("Invoices/" + invoice.InvoiceID, filePath, false)
          .then(function(attachments){
              //Attachment has been created 
              var myAttachment = attachments.entities[0];
          })
    })
```

### Retrieving All Attachments

This example shows how to retrieve attachments from an object in a single call.

```javascript

xeroClient.core.invoices.getInvoice(invoiceID)
    .then(function(invoice) {
        invoice.getAttachments()
            .then(function(attachments) {
                //Get the attachment as an object
                var myAttachment = attachments[0];
            });

    })
```

* When using the getAttachments method, as no object is being saved there is no `entities` array.  Instead you are provided an array of attachment objects that you can use directly in your application.

* Attachments (and the `getAttachments()` function) are supported on the following entities: 

  *  Accounts
  *  Bank Transactions
  *  Bank Transfers
  *  Contacts
  *  Credit Notes
  *  Invoices
  *  Manual Journals
  *  Receipts
  *  Repeating Invoices
  *  Purchase Orders

### Retrieving the content of an attachment

This example shows how to retrieve the raw content of an attachment and write it to a local file using a write stream.

```javascript

xeroClient.core.invoices.getInvoice(invoiceID)
    .then(function(invoice) {
        invoice.getAttachments()
            .then(function(attachments) {
                //Get the reference to the attachment object
                var myAttachment = attachments[0];

                //Create a local writestream
                var wstream = fs.createWriteStream('/path/to/some/file.pdf', { defaultEncoding: 'binary' });

                wstream.on('finish', function() {
                    //Data has been written successfully
                    done();
                });

                wstream.on('error', function(err) {
                    console.log('data writing failed',err);
                    wstream.close();
                });

                myAttachment.getContent(wstream)
                    .catch(function(err) {
                        console.log'Some error occurred: ', err);
                    });
            });

    })
```