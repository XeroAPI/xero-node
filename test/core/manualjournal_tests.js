'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

describe('manualjournals', () => {
  let ManualJournalID = '';
  let salesAccountID = '';
  let salesAccountCode = '';

  before('create a sales account for testing', () =>
    createAccount({ Type: 'REVENUE' }).then(response => {
      salesAccountID = response.entities[0].AccountID;
      salesAccountCode = response.entities[0].Code;
    })
  );

  after('archive the account for testing', () => {
    currentApp.core.accounts.getAccount(salesAccountID).then(response => {
      const account = response;
      account.Status = 'ARCHIVED';
      return account.save();
    });
  });

  it('create manual journal', done => {
    const sampleManualJournal = {
      Narration: 'Manual Journal Entry',
      Date: new Date().toISOString().split('T')[0],
      JournalLines: [
        {
          LineAmount: '-1000.00',
          AccountCode: salesAccountCode,
          TaxType: 'INPUT',
        },
        {
          LineAmount: '1000.00',
          AccountCode: salesAccountCode,
          TaxType: 'INPUT',
        },
      ],
    };

    const manualjournal = currentApp.core.manualjournals.newManualJournal(
      sampleManualJournal
    );
    manualjournal
      .save()
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);

        const manualJournal = response.entities[0];
        ManualJournalID = manualJournal.ManualJournalID;

        expect(response.entities[0].ManualJournalID).to.not.equal(undefined);
        expect(response.entities[0].ManualJournalID).to.not.equal('');
        expect(response.entities[0].Narration).to.equal(
          sampleManualJournal.Narration
        );

        manualJournal.JournalLines.forEach(journalItem => {
          expect(journalItem.LineAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
        });

        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get - modifiedAfter', done => {
    const modifiedAfter = new Date();

    // take 20 seconds ago as we just created a contact
    modifiedAfter.setTime(modifiedAfter.getTime() - 60000);

    currentApp.core.manualjournals
      .getManualJournals({ modifiedAfter })
      .then(manualjournals => {
        expect(manualjournals.length).to.equal(1);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get (no paging)', done => {
    currentApp.core.manualjournals
      .getManualJournals()
      .then(manualjournals => {
        manualjournals.forEach(manualJournal => {
          expect(manualJournal.ManualJournalID).to.not.equal('');
          expect(manualJournal.ManualJournalID).to.not.equal(undefined);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get (paging)', done => {
    const onManualJournals = (err, response, cb) => {
      cb();
      try {
        response.data.forEach(manualJournal => {
          expect(manualJournal.ManualJournalID).to.not.equal('');
          expect(manualJournal.ManualJournalID).to.not.equal(undefined);
        });

        if (response.finished) done();
      } catch (ex) {
        console.error(util.inspect(err, null, null));
        done(ex);
      }
    };

    currentApp.core.manualjournals
      .getManualJournals({ pager: { start: 1, callback: onManualJournals } })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get by id', done => {
    currentApp.core.manualjournals
      .getManualJournal(ManualJournalID)
      .then(manualjournal => {
        expect(manualjournal.ManualJournalID).to.equal(ManualJournalID);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get - invalid modified date', done => {
    currentApp.core.manualjournals
      .getManualJournals({ modifiedAfter: 'cats' })
      .then(manualjournals => {
        expect(manualjournals.length).to.be.greaterThan(1);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('update Manual Journal', done => {
    const newNarration = `Updated${Math.random()}`;
    currentApp.core.manualjournals
      .getManualJournal(ManualJournalID)
      .then(response => {
        const manualJournal = response;
        expect(manualJournal.ManualJournalID).to.equal(ManualJournalID);

        manualJournal.Narration = newNarration;

        return manualJournal.save();
      })
      .then(updatedManualJournal => {
        expect(updatedManualJournal.entities[0].Narration).to.equal(
          newNarration
        );
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get attachments for manualJournals', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.manualjournals
      .getManualJournals({ where: filter })
      .then(manualJournals => {
        if (manualJournals.length === 0) done();
        let objectsProcessed = 0;
        manualJournals.forEach(manualJournal => {
          manualJournal
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === manualJournals.length &&
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
