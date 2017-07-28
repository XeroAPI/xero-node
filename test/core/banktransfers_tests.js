'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
const util = common.util;

const currentApp = common.currentApp;

describe('bank transfers', function() {
  let sampleTransferID = '';
  let bankAccounts = [];

  before('get the bank accounts for testing', function() {
    const filter = 'TYPE == "BANK" && Status == "ACTIVE" && Code != null';
    return currentApp.core.accounts
      .getAccounts({ where: filter })
      .then(function(accounts) {
        bankAccounts = accounts;
      });
  });

  it('create sample bank transfer', function(done) {
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
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].BankTransferID).to.not.equal('');
        expect(response.entities[0].BankTransferID).to.not.equal(undefined);

        sampleTransferID = response.entities[0].BankTransferID;
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get (no paging)', function(done) {
    currentApp.core.bankTransfers
      .getBankTransfers()
      .then(function(bankTransfers) {
        bankTransfers.forEach(function(bankTransfer) {
          expect(bankTransfer.BankTransferID).to.not.equal('');
          expect(bankTransfer.BankTransferID).to.not.equal(undefined);
        });
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get single bank transfer', function(done) {
    currentApp.core.bankTransfers
      .getBankTransfer(sampleTransferID)
      .then(function(bankTransfer) {
        expect(bankTransfer.BankTransferID).to.not.equal('');
        expect(bankTransfer.BankTransferID).to.not.equal(undefined);
        expect(bankTransfer.BankTransferID).to.equal(sampleTransferID);
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
