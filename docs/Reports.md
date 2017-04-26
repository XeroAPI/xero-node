The following examples explain the Reports section of the SDK.  The API documentation on Reports can be found [here](https://developer.xero.com/documentation/api/reports).

### Generates the following reports

* Balance Sheet
* Trial Balance
* Profit & Loss
* Bank Statement
* Budget Summary
* Executive Summary
* Bank Summary
* Aged Receivables By Contact
* Aged Payables By Contact
* 1099 (US Orgs Only)

### Entity Helper

The entity helper that has been created for the reports functions exists in the following place:

`client.core.reports`

This helper contains the following functions:

* `generateReport(options)`

### Generating a new Report

This code assumes you've already created a client using the xero-node sdk. 

```javascript

//This is a sample options object to generate a Profit & Loss Report
var options = {
    id: 'ProfitAndLoss'
};

xeroClient.core.reports.generateReport(options)
    .then(function(report) {
        //Report has been generated 
        console.log(report.ReportType); //'ProfitAndLoss'
        console.log(report.ReportName); //'Profit and Loss'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Generating a new Report with Parameters

Some reports require parameters e.g. the Bank Account for a bank statement report.  This can be added within the options object as follows:

```javascript

//This is a sample options object to generate a Profit & Loss Report
var options = {
    id: 'BankStatement',
    params: {
        bankAccountID: 'f0033eee-d661-4250-a9c5-29adec3d1e41'
    }
};

xeroClient.core.reports.generateReport(options)
    .then(function(report) {
        //Report has been generated 
        console.log(report.ReportType); //'BankStatement'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Navigating the contents of a generated report

Fortunately, I've built a sample application that does just this!

See lines 507-616 of `sample_app/index.js` for the server side component.  
See `sample_app/views/reports.handlebars` for the client side component.

This essentially involves traversal of a bunch of `Row` and `Cell` objects to display the data required.

See the doc page on the Sample Application to get this up and running.
