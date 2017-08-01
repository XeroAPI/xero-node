'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
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
});
