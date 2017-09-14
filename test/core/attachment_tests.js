'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;
const fs = common.fs;

const currentApp = common.currentApp;

/**
   * Attachments should work on the following endpoints:
   *  Invoices
   *  Credit Notes
   *  Bank Transactions
   *  Bank Transfers
   *  Contacts
   *  Accounts
   *  Manual Journals
   *  Receipts
   *  Repeating Invoices
   *  Purchase Orders
   */

const validateAttachment = attachment => {
  if (!attachment) return false;

  expect(attachment.AttachmentID).to.not.equal('');
  expect(attachment.AttachmentID).to.not.equal(undefined);
  expect(attachment.ContentLength).to.be.greaterThan(0);
  expect(attachment.Url).to.not.equal('');
  expect(attachment.Url).to.not.equal(undefined);

  return true;
};

describe('attachments', () => {
  let invoiceID = '';
  const files = [];

  after('archive the account for testing', () => {
    files.forEach(file => {
      fs.unlink(file);
    });
  });

  it('creates an attachment on an invoice using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.invoices
      .getInvoices()
      .then(invoices => {
        const sampleInvoice = invoices[0];
        attachmentPlaceholder
          .save(`Invoices/${sampleInvoice.InvoiceID}`, samplePDF, false)
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            invoiceID = sampleInvoice.InvoiceID;
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an invoice using a file reference and online invoice set to true', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    const filter = 'Type == "ACCREC"';
    currentApp.core.invoices
      .getInvoices({ where: filter })
      .then(invoices => {
        const sampleInvoice = invoices[0];
        attachmentPlaceholder
          .save(`Invoices/${sampleInvoice.InvoiceID}`, samplePDF, false, {
            IncludeOnline: true,
          })
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            expect(response.entities[0].IncludeOnline).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('gets the raw content of the attachment', done => {
    let attachmentCount = 0;
    let writtenCount = 0;
    // Add attachment to an Invoice
    currentApp.core.invoices
      .getInvoice(invoiceID)
      .then(invoice => {
        invoice.getAttachments().then(attachments => {
          expect(attachments.length).to.be.at.least(1);

          attachmentCount = attachments.length;
          attachments.forEach((attachment, idx) => {
            const timestamp = new Date().getMilliseconds();

            const filename = `${__dirname}/testdata/test-${idx}-${timestamp}-${attachment.FileName}`;
            files.push(filename);

            attachment
              .getContent()
              .then(content => {
                fs.writeFile(
                  filename,
                  Buffer.alloc(attachment.ContentLength, content, 'binary'),
                  'binary',
                  err => {
                    if (err) {
                      console.error(err);
                    }
                    writtenCount += 1;
                  }
                );
              })
              .catch(err => {
                console.error(err);
              });
          });
        });
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });

    const timer = setInterval(() => {
      if (attachmentCount > 0 && writtenCount === attachmentCount) {
        clearInterval(timer);
        done();
      }
    }, 5000);
  });

  it('gets the content of an attachment as stream', done => {
    let attachmentCount = 0;
    let writtenCount = 0;
    // Add attachment to an Invoice
    currentApp.core.invoices
      .getInvoice(invoiceID)
      .then(invoice => {
        invoice.getAttachments().then(attachments => {
          expect(attachments.length).to.be.at.least(1);

          attachmentCount = attachments.length;

          attachments.forEach((attachment, idx) => {
            const timestamp = new Date().getMilliseconds();

            const filename = `${__dirname}/testdata/test-${idx}-${timestamp}-${attachment.FileName}`;
            files.push(filename);

            const wstream = fs.createWriteStream(filename, {
              defaultEncoding: 'binary',
            });
            wstream.on('finish', err => {
              // Data has been written successfully
              writtenCount += 1;
              wstream.close();
              if (err) console.error(err);
            });

            wstream.on('error', err => {
              console.error('data writing failed');
              wstream.close();
              console.error(err);
            });

            attachment.getContent(wstream).catch(err => {
              console.error(err);
            });
          });
        });
      })
      .catch(err => {
        console.error(err);
      });

    const timer = setInterval(() => {
      if (attachmentCount > 0 && writtenCount === attachmentCount) {
        clearInterval(timer);
        done();
      }
    }, 5000);
  });

  it('creates an attachment on a credit note using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.creditNotes
      .getCreditNotes()
      .then(creditNotes => {
        const sampleCreditNote = creditNotes[0];
        attachmentPlaceholder
          .save(
            `CreditNotes/${sampleCreditNote.CreditNoteID}`,
            samplePDF,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an banktransaction using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.bankTransactions
      .getBankTransactions()
      .then(bankTransactions => {
        const sampleBankTransaction = bankTransactions[0];
        attachmentPlaceholder
          .save(
            `BankTransactions/${sampleBankTransaction.BankTransactionID}`,
            samplePDF,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an banktransfer using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.bankTransfers
      .getBankTransfers()
      .then(bankTransfers => {
        const sampleBankTransfer = bankTransfers[0];
        attachmentPlaceholder
          .save(
            `BankTransfers/${sampleBankTransfer.BankTransferID}`,
            samplePDF,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an contact using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.contacts
      .getContacts()
      .then(contacts => {
        const sampleContact = contacts[0];
        attachmentPlaceholder
          .save(`Contacts/${sampleContact.ContactID}`, samplePDF, false)
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an account using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.accounts
      .getAccounts()
      .then(accounts => {
        const sampleAccount = accounts[0];
        attachmentPlaceholder
          .save(`Accounts/${sampleAccount.AccountID}`, samplePDF, false)
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on a manual journal using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.manualjournals
      .getManualJournals()
      .then(manualJournals => {
        const sampleManualJournal = manualJournals[0];
        attachmentPlaceholder
          .save(
            `ManualJournals/${sampleManualJournal.ManualJournalID}`,
            samplePDF,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  // Using streams instead of files (attachment number 2)
  it('creates an attachment on an invoice using a file stream', done => {
    const attachmentTemplate = {
      FileName: '2-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;

    const dataReadStream = fs.createReadStream(samplePDF);
    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.invoices
      .getInvoices()
      .then(invoices => {
        const sampleInvoice = invoices[0];
        attachmentPlaceholder
          .save(`Invoices/${sampleInvoice.InvoiceID}`, dataReadStream, true)
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on a credit note using a file stream', done => {
    const attachmentTemplate = {
      FileName: '2-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);
    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.creditNotes
      .getCreditNotes()
      .then(creditNotes => {
        const sampleCreditNote = creditNotes[0];
        attachmentPlaceholder
          .save(
            `CreditNotes/${sampleCreditNote.CreditNoteID}`,
            dataReadStream,
            true
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an banktransaction using a file stream', done => {
    const attachmentTemplate = {
      FileName: '2-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);
    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.bankTransactions
      .getBankTransactions()
      .then(bankTransactions => {
        const sampleBankTransaction = bankTransactions[0];
        attachmentPlaceholder
          .save(
            `BankTransactions/${sampleBankTransaction.BankTransactionID}`,
            dataReadStream,
            true
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an banktransfer using a file stream', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);
    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.bankTransfers
      .getBankTransfers()
      .then(bankTransfers => {
        const sampleBankTransfer = bankTransfers[0];
        attachmentPlaceholder
          .save(
            `BankTransfers/${sampleBankTransfer.BankTransferID}`,
            dataReadStream,
            true
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an contact using a file stream', done => {
    const attachmentTemplate = {
      FileName: '2-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);
    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.contacts
      .getContacts()
      .then(contacts => {
        const sampleContact = contacts[0];
        attachmentPlaceholder
          .save(`Contacts/${sampleContact.ContactID}`, dataReadStream, true)
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an account using a file stream', done => {
    const attachmentTemplate = {
      FileName: '2-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);
    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.accounts
      .getAccounts()
      .then(accounts => {
        const sampleAccount = accounts[0];
        attachmentPlaceholder
          .save(`Accounts/${sampleAccount.AccountID}`, dataReadStream, true)
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on a manual journal using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.manualjournals
      .getManualJournals()
      .then(manualJournals => {
        const sampleManualJournal = manualJournals[0];
        attachmentPlaceholder
          .save(
            `ManualJournals/${sampleManualJournal.ManualJournalID}`,
            dataReadStream,
            true
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on a receipt using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.receipts
      .getReceipts()
      .then(receipts => {
        const sampleReceipt = receipts[0];
        return attachmentPlaceholder.save(
          `Receipts/${sampleReceipt.ReceiptID}`,
          dataReadStream,
          true
        );
      })
      .then(response => {
        expect(response.entities.length).to.equal(1);
        expect(validateAttachment(response.entities[0])).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on a repeatinginvoice using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.repeatinginvoices
      .getRepeatingInvoices()
      .then(repeatinginvoices => {
        const sampleRepeatingInvoice = repeatinginvoices[0];
        attachmentPlaceholder
          .save(
            `RepeatingInvoices/${sampleRepeatingInvoice.RepeatingInvoiceID}`,
            dataReadStream,
            true
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on a purchaseorder using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(samplePDF);

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.purchaseOrders
      .getPurchaseOrders()
      .then(purchaseOrders => {
        const samplePurchaseOrder = purchaseOrders[0];
        attachmentPlaceholder
          .save(
            `PurchaseOrders/${samplePurchaseOrder.PurchaseOrderID}`,
            dataReadStream,
            true
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            expect(validateAttachment(response.entities[0])).to.equal(true);
            done();
          })
          .catch(err => {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates an attachment on an account using text as a stream - should fail', done => {
    const attachmentTemplate = {
      FileName: '2-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const samplePDF = `${__dirname}/testdata/test-attachment.pdf`;
    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.accounts
      .getAccounts()
      .then(accounts => {
        const sampleAccount = accounts[0];
        attachmentPlaceholder
          .save(`Accounts/${sampleAccount.AccountID}`, samplePDF, true)
          .then(() => {
            done(new Error('Expected method to reject.'));
          })
          .catch(err => {
            expect(err).to.not.equal(undefined);
            done();
          })
          .catch(done);
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
