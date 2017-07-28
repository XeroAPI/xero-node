'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
const util = common.util;

const currentApp = common.currentApp;

describe('contacts', function() {
  let sampleContact = {
    Name: `Johnnies Coffee ${Math.random()}`,
    FirstName: 'John',
    LastName: 'Smith',
  };

  const newName = `Updated ${Math.random()}`;

  it('create single contact', function(done) {
    const contact = currentApp.core.contacts.newContact(sampleContact);
    contact
      .save()
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].ContactID).to.not.equal('');
        expect(response.entities[0].ContactID).to.not.equal(undefined);
        expect(response.entities[0].Name).to.equal(sampleContact.Name);
        expect(response.entities[0].FirstName).to.equal(
          sampleContact.FirstName
        );
        expect(response.entities[0].LastName).to.equal(sampleContact.LastName);

        sampleContact = response.entities[0];

        done();
      })
      .catch(function(err) {
        console.error(err);
        done(wrapError(err));
      });
  });
  it('get - modifiedAfter', function(done) {
    const modifiedAfter = new Date();

    // take 30 seconds ago as we just created a contact
    modifiedAfter.setTime(modifiedAfter.getTime() - 60000);

    currentApp.core.contacts
      .getContacts({ modifiedAfter })
      .then(function(contacts) {
        expect(contacts.length).to.equal(1);
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get (no paging)', function(done) {
    currentApp.core.contacts
      .getContacts()
      .then(function(contacts) {
        contacts.forEach(function(contact) {
          expect(contact.ContactID).to.not.equal('');
          expect(contact.ContactID).to.not.equal(undefined);
        });
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get (paging)', function(done) {
    const onContacts = (err, response, cb) => {
      cb();
      try {
        response.data.forEach(contact => {
          expect(contact.ContactID).to.not.equal('');
          expect(contact.ContactID).to.not.equal(undefined);
        });

        if (response.finished) done();
      } catch (ex) {
        console.error(util.inspect(err, null, null));
        done(ex);
      }
    };

    currentApp.core.contacts
      .getContacts({ pager: { start: 1, callback: onContacts } })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get by id', function(done) {
    currentApp.core.contacts
      .getContact(sampleContact.ContactID)
      .then(function(contact) {
        expect(contact.ContactID).to.equal(sampleContact.ContactID);
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get - invalid modified date', function(done) {
    currentApp.core.contacts
      .getContacts({ modifiedAfter: 'cats' })
      .then(function(contacts) {
        expect(contacts.length).to.be.greaterThan(1);
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('create multiple contacts', function(done) {
    const contacts = [];

    for (let i = 0; i < 2; i += 1) {
      contacts.push(
        currentApp.core.contacts.newContact({
          Name: `Johnnies Coffee ${Math.random()}`,
          FirstName: `John ${Math.random()}`,
          LastName: 'Smith',
        })
      );
    }

    currentApp.core.contacts
      .saveContacts(contacts)
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(function(contact) {
          expect(contact.ContactID).to.not.equal('');
          expect(contact.ContactID).to.not.equal(undefined);
        });
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('update contact', function(done) {
    currentApp.core.contacts
      .getContact(sampleContact.ContactID)
      .then(function(response) {
        const thisContact = response;
        expect(thisContact.ContactID).to.equal(sampleContact.ContactID);

        thisContact.Name = newName;
        thisContact.EmailAddress = `${thisContact.FirstName}.${thisContact.LastName}@gmail.com`;
        thisContact.ContactPersons = [
          {
            FirstName: 'Johnny',
            LastName: 'Scribgibbons',
            EmailAddress: 'j.scribgib@gribbons.com',
            IncludeInEmails: true,
          },
        ];
        thisContact.Addresses = [
          {
            AddressLine1: '15 Scriby Street',
            AddressLine2: 'Preston',
            AddressLine3: 'Prestonville',
            AddressLine4: 'Scribeystanistan',
            City: 'Melbourne',
            Region: 'Victoria',
            PostalCode: '3000',
            Country: 'Australia',
            AttentionTo: 'Johnny',
            AddressType: 'STREET',
          },
        ];
        return thisContact.save();
      })
      .then(function(updatedContact) {
        expect(updatedContact.entities[0].Name).to.equal(newName);
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get attachments for contacts', function(done) {
    currentApp.core.contacts
      .getContact(sampleContact.ContactID)
      .then(function(contact) {
        expect(contact.ContactID).to.equal(sampleContact.ContactID);
        contact
          .getAttachments()
          .then(function(attachments) {
            done();
          })
          .catch(function(err) {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
