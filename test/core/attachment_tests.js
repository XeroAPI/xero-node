'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
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
   */

/** Attachments are not yet supported on the following endpoints:
   *   Receipts
   *   Manual Journals
   *   Repeating Invoices
   */

describe('attachments', () => {
  let invoiceID = '';

  it('creates an attachment on an invoice using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.invoices
      .getInvoices()
      .then(invoices => {
        const sampleInvoice = invoices[0];
        attachmentPlaceholder
          .save(
            `Invoices/${sampleInvoice.InvoiceID}`,
            sampleDataReference,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

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
          .save(
            `Invoices/${sampleInvoice.InvoiceID}`,
            sampleDataReference,
            false,
            { IncludeOnline: true }
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
            expect(thisFile.IncludeOnline).to.equal(true);
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

  it('gets the content of an attachment as stream', done => {
    // Add attachment to an Invoice
    currentApp.core.invoices
      .getInvoice(invoiceID)
      .then(invoice => {
        invoice.getAttachments().then(attachments => {
          expect(attachments.length).to.be.at.least(1);

          const first = attachments[0];

          const wstream = fs.createWriteStream(
            `${__dirname}/testdata/test1-${first.FileName}`,
            { defaultEncoding: 'binary' }
          );
          wstream.on('finish', () => {
            // Data has been written successfully
            done();
          });

          wstream.on('error', err => {
            console.error('data writing failed');
            wstream.close();
            console.error(err);
            done(wrapError(err));
          });

          first.getContent(wstream).catch(err => {
            console.error(err);
            done(wrapError(err));
          });
        });
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('creates an attachment on a credit note using a file reference', done => {
    const attachmentTemplate = {
      FileName: '1-test-attachment.pdf',
      MimeType: 'application/pdf',
    };

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

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
            sampleDataReference,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

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
            sampleDataReference,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

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
            sampleDataReference,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.contacts
      .getContacts()
      .then(contacts => {
        const sampleContact = contacts[0];
        attachmentPlaceholder
          .save(
            `Contacts/${sampleContact.ContactID}`,
            sampleDataReference,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.accounts
      .getAccounts()
      .then(accounts => {
        const sampleAccount = accounts[0];
        attachmentPlaceholder
          .save(
            `Accounts/${sampleAccount.AccountID}`,
            sampleDataReference,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

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
            sampleDataReference,
            false
          )
          .then(response => {
            expect(response.entities.length).to.equal(1);
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

    const dataReadStream = fs.createReadStream(sampleDataReference);
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
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(sampleDataReference);
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
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(sampleDataReference);
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
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(sampleDataReference);
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
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(sampleDataReference);
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
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(sampleDataReference);
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
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
    const dataReadStream = fs.createReadStream(sampleDataReference);

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
            const thisFile = response.entities[0];
            expect(thisFile.AttachmentID).to.not.equal('');
            expect(thisFile.AttachmentID).to.not.equal(undefined);
            expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
            expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
            expect(thisFile.ContentLength).to.be.greaterThan(0);
            expect(thisFile.Url).to.not.equal('');
            expect(thisFile.Url).to.not.equal(undefined);
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

    const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
    const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
      attachmentTemplate
    );

    // Add attachment to an Invoice
    currentApp.core.accounts
      .getAccounts()
      .then(accounts => {
        const sampleAccount = accounts[0];
        attachmentPlaceholder
          .save(
            `Accounts/${sampleAccount.AccountID}`,
            sampleDataReference,
            true
          )
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
