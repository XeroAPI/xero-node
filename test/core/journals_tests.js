'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;

const currentApp = common.currentApp;

describe('journals', () => {
  let sampleJournalId = '';

  it('get (paging with callback)', done => {
    let recordCount = 0;
    const onJournals = (err, ret, cb) => {
      cb();
      recordCount += ret.data.length;
      ret.data.forEach(journal => {
        expect(journal.JournalID).to.not.equal('');
        expect(journal.JournalID).to.not.equal(undefined);
        expect(journal.JournalLines).to.have.length.at.least(0);
      });

      try {
        if (ret.finished) {
          done();
        }
      } catch (ex) {
        console.error(util.inspect(ex, null, null));
        done(ex);
      }
    };

    currentApp.core.journals
      .getJournals({ pager: { start: 1, callback: onJournals } })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get (paging no callback)', done => {
    currentApp.core.journals
      .getJournals({ pager: { start: 1, callback: undefined } })
      .then(journals => {
        expect(journals).to.not.equal(undefined);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get (no paging)', done => {
    currentApp.core.journals
      .getJournals()
      .then(journals => {
        expect(journals).to.not.equal(undefined);
        expect(journals).to.be.an('Array');
        expect(journals).to.have.length.greaterThan(0);

        sampleJournalId = journals[0].JournalID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get single journal', done => {
    currentApp.core.journals
      .getJournal(sampleJournalId)
      .then(journal => {
        expect(journal).to.be.an('Object');
        expect(journal.JournalID).to.equal(sampleJournalId);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
