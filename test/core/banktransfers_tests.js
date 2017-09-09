'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;

const currentApp = common.currentApp;

describe('bank transfers', () => {
  let sampleTransferID = '';
  let bankAccounts = [];

  before('get the bank accounts for testing', () => {
    const filter = 'TYPE == "BANK" && Status == "ACTIVE" && Code != null';
    return currentApp.core.accounts
      .getAccounts({ where: filter })
      .then(accounts => {
        bankAccounts = accounts;
      });
  });

  it('create sample bank transfer', done => {
    // console.log(bankAccounts);
    const payload = {
      FromBankAccount: {
        Code: bankAccounts[0].Code,
      },
      ToBankAccount: {
        Code: bankAccounts[1].Code,
      },
      Amount: '20.00',
    };
    const transfer = currentApp.core.bankTransfers.newBankTransfer(payload);

    transfer
      .save()
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].BankTransferID).to.not.equal('');
        expect(response.entities[0].BankTransferID).to.not.equal(undefined);

        sampleTransferID = response.entities[0].BankTransferID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get (no paging)', done => {
    currentApp.core.bankTransfers
      .getBankTransfers()
      .then(bankTransfers => {
        bankTransfers.forEach(bankTransfer => {
          expect(bankTransfer.BankTransferID).to.not.equal('');
          expect(bankTransfer.BankTransferID).to.not.equal(undefined);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get single bank transfer', done => {
    currentApp.core.bankTransfers
      .getBankTransfer(sampleTransferID)
      .then(bankTransfer => {
        expect(bankTransfer.BankTransferID).to.not.equal('');
        expect(bankTransfer.BankTransferID).to.not.equal(undefined);
        expect(bankTransfer.BankTransferID).to.equal(sampleTransferID);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('create multiple bank transfers', done => {
    const banktransfers = [];

    for (let i = 0; i < 2; i += 1) {
      banktransfers.push(
        currentApp.core.bankTransfers.newBankTransfer({
          FromBankAccount: {
            Code: bankAccounts[0].Code,
          },
          ToBankAccount: {
            Code: bankAccounts[1].Code,
          },
          Amount: `${Math.random()}`,
        })
      );
    }

    currentApp.core.bankTransfers
      .saveBankTransfers(banktransfers)
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(banktransfer => {
          expect(banktransfer.BankTransferID).to.not.equal('');
          expect(banktransfer.BankTransferID).to.not.equal(undefined);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get attachments for bankTransfers', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.bankTransfers
      .getBankTransfers({ where: filter })
      .then(bankTransfers => {
        if (bankTransfers.length === 0) done();
        let objectsProcessed = 0;
        bankTransfers.forEach(transfer => {
          transfer
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === bankTransfers.length &&
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
