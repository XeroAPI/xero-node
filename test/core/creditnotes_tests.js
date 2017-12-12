'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

describe('Credit Notes', () => {
  let creditNoteID = '';
  let salesAccountID = '';
  let salesAccountCode = '';

  before('create a sales account and invoice for testing', () =>
    createAccount({ Type: 'REVENUE' })
      .then(response => {
        salesAccountID = response.entities[0].AccountID;
        salesAccountCode = response.entities[0].Code;
      })
      .then(() => {
        const invoice = currentApp.core.invoices.newInvoice({
          Type: 'ACCPAY',
          Status: 'AUTHORISED',
          Contact: {
            Name: 'Department of Testing',
          },
          DueDate: new Date().toISOString().split('T')[0],
          LineItems: [
            {
              Description: 'MacBook Pro',
              Quantity: 2,
              UnitAmount: 2000,
              AccountCode: salesAccountCode,
            },
          ],
        });

        return invoice.save({ unitdp: 4 });
      })
      .catch(err => {
        console.error(err);
      })
  );

  after('archive the account for testing', () => {
    currentApp.core.accounts.getAccount(salesAccountID).then(response => {
      const account = response;
      account.Status = 'ARCHIVED';
      return account.save();
    });
  });

  it('get', done => {
    currentApp.core.creditNotes
      .getCreditNotes()
      .then(creditNotes => {
        expect(creditNotes).to.have.length.greaterThan(0);
        creditNotes.forEach(creditNote => {
          // Check the contact
          if (creditNote.Contact) {
            expect(creditNote.Contact.ContactID).to.not.equal('');
            expect(creditNote.Contact.ContactID).to.not.equal(undefined);
            expect(creditNote.Contact.Name).to.not.equal('');
            expect(creditNote.Contact.Name).to.not.equal(undefined);
          } else {
            console.warn('Credit note has no contact record');
          }

          expect(creditNote.Date).to.not.equal('');
          expect(creditNote.Date).to.not.equal(undefined);

          expect(creditNote.Status).to.be.oneOf([
            'DRAFT',
            'SUBMITTED',
            'DELETED',
            'AUTHORISED',
            'PAID',
            'VOIDED',
          ]);
          expect(creditNote.LineAmountTypes).to.be.oneOf([
            'Exclusive',
            'Inclusive',
            'NoTax',
          ]);

          expect(creditNote.SubTotal).to.be.a('Number');
          expect(creditNote.SubTotal).to.be.at.least(0);
          expect(creditNote.TotalTax).to.be.a('Number');
          expect(creditNote.TotalTax).to.be.at.least(0);
          expect(creditNote.Total).to.be.a('Number');
          expect(creditNote.Total).to.be.at.least(0);

          expect(creditNote.UpdatedDateUTC).to.not.equal('');
          expect(creditNote.UpdatedDateUTC).to.not.equal(undefined);

          expect(creditNote.CurrencyCode).to.not.equal('');
          expect(creditNote.CurrencyCode).to.not.equal(undefined);

          if (creditNote.FullyPaidOnDate) {
            expect(creditNote.FullyPaidOnDate).to.not.equal('');
          }

          expect(creditNote.Type).to.be.oneOf(['ACCPAYCREDIT', 'ACCRECCREDIT']);

          expect(creditNote.CreditNoteID).to.not.equal('');
          expect(creditNote.CreditNoteID).to.not.equal(undefined);

          // Set the variable for the next test.
          creditNoteID = creditNote.CreditNoteID;

          if (creditNote.Status === 'AUTHORISED') {
            if (creditNote.CreditNoteNumber) {
              expect(creditNote.CreditNoteNumber).to.not.equal('');
            }

            if (creditNote.CurrencyRate) {
              expect(creditNote.CurrencyRate).to.be.a('Number');
              expect(creditNote.CurrencyRate).to.be.at.least(0);
            }

            if (creditNote.RemainingCredit) {
              expect(creditNote.RemainingCredit).to.be.a('Number');
              expect(creditNote.RemainingCredit).to.be.at.least(0);
            }

            if (creditNote.Allocations) {
              creditNote.Allocations.forEach(allocation => {
                if (allocation.AppliedAmount) {
                  expect(allocation.AppliedAmount).to.be.a('Number');
                  expect(allocation.AppliedAmount).to.be.at.least(0);
                }

                if (allocation.Invoice) {
                  expect(allocation.Invoice.InvoiceID).to.not.equal('');
                  expect(allocation.Invoice.InvoiceID).to.not.equal(undefined);
                } else {
                  console.warn('Credit note allocation has no invoice record');
                }
              });
            } else {
              console.warn('Credit note has no allocation records');
            }
          }

          if (creditNote.Reference) {
            expect(creditNote.Reference).to.be.a('String');
          }
        });
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('get a single credit note', done => {
    currentApp.core.creditNotes
      .getCreditNote(creditNoteID)
      .then(creditNote => {
        // Check the contact
        if (creditNote.Contact) {
          expect(creditNote.Contact.ContactID).to.not.equal('');
          expect(creditNote.Contact.ContactID).to.not.equal(undefined);
          expect(creditNote.Contact.Name).to.not.equal('');
          expect(creditNote.Contact.Name).to.not.equal(undefined);
        } else {
          console.warn('Credit note has no contact record');
        }

        expect(creditNote.Date).to.not.equal('');
        expect(creditNote.Date).to.not.equal(undefined);

        expect(creditNote.Status).to.be.oneOf([
          'DRAFT',
          'SUBMITTED',
          'DELETED',
          'AUTHORISED',
          'PAID',
          'VOIDED',
        ]);
        expect(creditNote.LineAmountTypes).to.be.oneOf([
          'Exclusive',
          'Inclusive',
          'NoTax',
        ]);

        expect(creditNote.SubTotal).to.be.a('Number');
        expect(creditNote.SubTotal).to.be.at.least(0);
        expect(creditNote.TotalTax).to.be.a('Number');
        expect(creditNote.TotalTax).to.be.at.least(0);
        expect(creditNote.Total).to.be.a('Number');
        expect(creditNote.Total).to.be.at.least(0);

        expect(creditNote.UpdatedDateUTC).to.not.equal('');
        expect(creditNote.UpdatedDateUTC).to.not.equal(undefined);

        expect(creditNote.CurrencyCode).to.not.equal('');
        expect(creditNote.CurrencyCode).to.not.equal(undefined);

        if (creditNote.FullyPaidOnDate) {
          expect(creditNote.FullyPaidOnDate).to.not.equal('');
        }

        expect(creditNote.Type).to.be.oneOf(['ACCPAYCREDIT', 'ACCRECCREDIT']);

        expect(creditNote.CreditNoteID).to.not.equal('');
        expect(creditNote.CreditNoteID).to.not.equal(undefined);

        // Set the variable for the next test.
        creditNoteID = creditNote.CreditNoteID;

        if (creditNote.Status === 'AUTHORISED') {
          if (creditNote.CreditNoteNumber) {
            expect(creditNote.CreditNoteNumber).to.not.equal('');
          }

          if (creditNote.CurrencyRate) {
            expect(creditNote.CurrencyRate).to.be.a('Number');
            expect(creditNote.CurrencyRate).to.be.at.least(0);
          }

          if (creditNote.RemainingCredit) {
            expect(creditNote.RemainingCredit).to.be.a('Number');
            expect(creditNote.RemainingCredit).to.be.at.least(0);
          }

          if (creditNote.Allocations) {
            creditNote.Allocations.forEach(allocation => {
              if (allocation.AppliedAmount) {
                expect(allocation.AppliedAmount).to.be.a('Number');
                expect(allocation.AppliedAmount).to.be.at.least(0);
              }

              if (allocation.Invoice) {
                expect(allocation.Invoice.InvoiceID).to.not.equal('');
                expect(allocation.Invoice.InvoiceID).to.not.equal(undefined);
              } else {
                console.warn('Credit note allocation has no invoice record');
              }
            });
          } else {
            console.warn('Credit note has no allocation records');
          }

          if (creditNote.LineItems) {
            creditNote.LineItems.forEach(lineItem => {
              if (lineItem.LineItemID) {
                expect(lineItem.LineItemID).to.not.equal('');
              }

              expect(lineItem.Description).to.not.equal('');
              expect(lineItem.Description).to.not.equal(undefined);

              if (lineItem.Quantity) {
                expect(lineItem.Quantity).to.be.a('Number');
                expect(lineItem.Quantity).to.be.at.least(0);

                expect(lineItem.UnitAmount).to.be.a('Number');
                expect(lineItem.UnitAmount).to.be.at.least(0);

                if (lineItem.ItemCode) {
                  expect(lineItem.ItemCode).to.be.a('String');
                  expect(lineItem.ItemCode).to.not.equal('');
                  expect(lineItem.ItemCode).to.not.equal(undefined);
                }

                expect(lineItem.AccountCode).to.be.a('String');
                expect(lineItem.AccountCode).to.not.equal('');
                expect(lineItem.AccountCode).to.not.equal(undefined);

                expect(lineItem.TaxType).to.not.equal('');
                expect(lineItem.TaxType).to.not.equal(undefined);

                expect(lineItem.TaxAmount).to.be.a('Number');
                expect(lineItem.TaxAmount).to.be.at.least(0);

                expect(lineItem.LineAmount).to.be.a('Number');
                expect(lineItem.LineAmount).to.be.at.least(0);

                if (lineItem.Tracking) {
                  lineItem.Tracking.forEach(trackingCategory => {
                    expect(trackingCategory.Name).to.not.equal('');
                    expect(trackingCategory.Name).to.not.equal(undefined);

                    expect(trackingCategory.Option).to.not.equal('');
                    expect(trackingCategory.Option).to.not.equal(undefined);

                    expect(trackingCategory.TrackingCategoryID).to.not.equal(
                      ''
                    );
                    expect(trackingCategory.TrackingCategoryID).to.not.equal(
                      undefined
                    );

                    expect(trackingCategory.TrackingOptionID).to.not.equal('');
                    expect(trackingCategory.TrackingOptionID).to.not.equal(
                      undefined
                    );
                  });
                }
              }
            });
          } else {
            console.warn('Credit note has no line item records');
          }
        }

        if (creditNote.Reference) {
          expect(creditNote.Reference).to.be.a('String');
        }
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('creates a draft credit note', done => {
    const creditNoteData = {
      Type: 'ACCPAYCREDIT',
      Reference: 'Test CreditNote from Node.js',
      Contact: {
        Name: 'John Smith',
      },
      Status: 'DRAFT',
      LineAmountTypes: 'Exclusive',
      CurrencyCode: 'AUD',
      LineItems: [
        {
          Description: 'MacBook - White',
          Quantity: 1,
          UnitAmount: 1995.0,
          AccountCode: salesAccountCode,
        },
      ],
    };

    const creditNote = currentApp.core.creditNotes.newCreditNote(
      creditNoteData
    );

    creditNote
      .save()
      .then(creditNotes => {
        expect(creditNotes.entities).to.have.length(1);
        const thisNote = creditNotes.entities[0];

        creditNoteID = thisNote.CreditNoteID;

        expect(thisNote.Type).to.equal(creditNoteData.Type);
        // expect(thisNote.Contact.ContactID).to.equal(creditNoteData.Contact.ContactID)

        thisNote.LineItems.forEach(lineItem => {
          expect(lineItem.Description).to.equal(
            creditNoteData.LineItems[0].Description
          );
          expect(lineItem.Quantity).to.equal(
            creditNoteData.LineItems[0].Quantity
          );
          expect(lineItem.UnitAmount).to.equal(
            creditNoteData.LineItems[0].UnitAmount
          );
          expect(lineItem.AccountCode.toLowerCase()).to.equal(
            creditNoteData.LineItems[0].AccountCode.toLowerCase()
          );
        });

        expect(thisNote.Reference).to.equal(creditNoteData.Reference);

        done();
      })
      .catch(err => {
        console.warn(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('approves a credit note', done => {
    // Get the draft credit note, update it, and save it.
    currentApp.core.creditNotes
      .getCreditNote(creditNoteID)
      .then(response => {
        const creditNote = response;
        creditNote.Status = 'AUTHORISED';
        creditNote.Date = new Date().toISOString().split('T')[0];

        creditNote
          .save()
          .then(savedCreditNote => {
            expect(savedCreditNote.entities).to.have.length(1);
            const thisNote = savedCreditNote.entities[0];
            expect(thisNote.Status).to.equal('AUTHORISED');
            done();
          })
          .catch(err => {
            console.warn(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.warn(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('adds an allocation to a credit note', done => {
    currentApp.core.invoices
      .getInvoices({
        where:
          'Type == "ACCPAY" and Status == "AUTHORISED" and AmountCredited == 0',
      })
      .then(invoices => {
        expect(invoices).to.have.length.greaterThan(0);

        const myInvoice = invoices[0];
        const myContact = myInvoice.Contact;
        const myCreditNoteAmount = myInvoice.AmountDue / 2; // 50% of total amount left

        // Create the credit note.
        const creditNoteData = {
          Type: 'ACCPAYCREDIT',
          Contact: {
            ContactID: myContact.ContactID,
          },
          LineItems: [
            {
              Description: 'Credit',
              Quantity: 1,
              UnitAmount: myCreditNoteAmount,
              AccountCode: salesAccountCode,
            },
          ],
          Status: 'AUTHORISED',
          Date: new Date().toISOString().split('T')[0],
        };

        const creditNote = currentApp.core.creditNotes.newCreditNote(
          creditNoteData
        );

        creditNote
          .save()
          .then(creditNotes => {
            expect(creditNotes.entities).to.have.length(1);
            const thisNote = creditNotes.entities[0];

            // Now apply the allocation to the original invoice.
            const allocations = [
              {
                Amount: myCreditNoteAmount,
                Invoice: {
                  InvoiceID: myInvoice.InvoiceID,
                },
              },
            ];

            thisNote
              .saveAllocations(allocations)
              .then(() => {
                // console.warn(res)
                done();
              })
              .catch(err => {
                console.warn(util.inspect(err, null, null));
                done(wrapError(err));
              });
          })
          .catch(err => {
            console.warn(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(err => {
        console.warn(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get attachments for credit notes', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.creditNotes
      .getCreditNotes({ where: filter })
      .then(creditNotes => {
        if (creditNotes.length === 0) done();
        let objectsProcessed = 0;
        creditNotes.forEach(creditNote => {
          creditNote
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === creditNotes.length &&
                  index === attachments.length - 1
                ) {
                  done();
                }
              });
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
            });
        });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
