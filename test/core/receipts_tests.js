'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

const validateReceipt = Receipt => {
  if (!Receipt) return false;

  expect(Receipt.ReceiptID).to.be.a('String');

  return true;
};

describe('Receipts', () => {
  const sampleReceipt = {
    Status: 'ACTIVE',
    Date: new Date().toISOString().split('T')[0],
    User: {},
    Contact: {},
    LineItems: [],
  };

  let salesAccountID = '';
  let salesAccountCode = '';

  before('get a user', done => {
    currentApp.core.users
      .getUsers()
      .then(users => {
        sampleReceipt.User.UserID = users[0].UserID;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  before('get a contact', done => {
    currentApp.core.contacts
      .getContacts()
      .then(contacts => {
        sampleReceipt.Contact.ContactID = contacts[0].ContactID;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  before('create a sales account for testing', done => {
    createAccount({
      Type: 'EXPENSE',
      ShowInExpenseClaims: true,
    }).then(response => {
      salesAccountID = response.entities[0].AccountID;
      salesAccountCode = response.entities[0].Code;
      sampleReceipt.LineItems = [
        {
          Description: 'Services',
          Quantity: 2,
          UnitAmount: 230,
          AccountCode: salesAccountCode,
        },
      ];
      done();
    });
  });

  after('archive the account for testing', () => {
    currentApp.core.accounts.getAccount(salesAccountID).then(response => {
      const account = response;
      account.Status = 'ARCHIVED';
      return account.save();
    });
  });

  it('creates an Receipt', done => {
    const Receipt = common.currentApp.core.receipts.newReceipt(sampleReceipt);

    Receipt.save()
      .then(response => {
        expect(validateReceipt(response.entities[0])).to.equal(true);
        sampleReceipt.ReceiptID = response.entities[0].ReceiptID;
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get one', done => {
    common.currentApp.core.receipts
      .getReceipt(sampleReceipt.ReceiptID)
      .then(Receipt => {
        expect(validateReceipt(Receipt)).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get all', done => {
    currentApp.core.receipts
      .getReceipts()
      .then(Receipts => {
        Receipts.forEach(Receipt => {
          expect(validateReceipt(Receipt)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('create multiple Receipts', done => {
    const Receipts = [];

    sampleReceipt.LineItems = [
      {
        Description: 'Services',
        Quantity: 2,
        UnitAmount: 230,
        AccountCode: salesAccountCode,
      },
    ];

    for (let i = 0; i < 10; i += 1) {
      const newReceipt = {};
      Object.assign(newReceipt, sampleReceipt);
      newReceipt.ReceiptID = undefined;

      Receipts.push(common.currentApp.core.receipts.newReceipt(newReceipt));
    }

    common.currentApp.core.receipts
      .saveReceipts(Receipts)
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(Receipt => {
          expect(validateReceipt(Receipt)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('Updates an Receipt', done => {
    const updatedReference = `Updated ${Math.random()}`;
    common.currentApp.core.receipts
      .getReceipt(sampleReceipt.ReceiptID)
      .then(receipt => {
        expect(validateReceipt(receipt)).to.equal(true);
        receipt.Reference = updatedReference;
        return receipt.save();
      })
      .then(response => {
        expect(validateReceipt(response.entities[0])).to.equal(true);
        expect(response.entities[0].Reference).to.equal(updatedReference);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get attachments for receipts', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.receipts
      .getReceipts({ where: filter })
      .then(receipts => {
        if (receipts.length === 0) done();
        let objectsProcessed = 0;
        receipts.forEach(receipt => {
          receipt
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === receipts.length &&
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
