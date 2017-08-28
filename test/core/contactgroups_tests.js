'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;

const validateContactGroup = contactGroup => {
  if (!contactGroup) {
    return false;
  }

  expect(contactGroup.ContactGroupID).to.be.a('String');
  expect(contactGroup.Name).to.be.a('String');
  expect(contactGroup.Status).to.be.a('String');
  expect(contactGroup.Contacts.length).to.be.a('Number');
  contactGroup.Contacts.forEach(contact => {
    expect(contact.ContactID).to.be.a('String');
    expect(contact.Name).to.be.a('String');
  });

  return true;
};

describe('Contact Groups', () => {
  let contactGroupID = '';
  const sampleContactGroup = {
    Name: `Test Contact Group: ${Math.random()}`,
    Status: 'ACTIVE',
  };
  it('get all', done => {
    common.currentApp.core.contactGroups
      .getContactGroups()
      .then(contactGroups => {
        expect(contactGroups).to.have.length.greaterThan(0);
        contactGroups.forEach(contactGroup => {
          expect(validateContactGroup(contactGroup)).to.equal(true);
          contactGroupID = contactGroup.ContactGroupID;
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get single', done => {
    common.currentApp.core.contactGroups
      .getContactGroup(contactGroupID)
      .then(contactGroup => {
        expect(validateContactGroup(contactGroup)).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get with filter', done => {
    const filter = 'Name.Contains("Updated")';
    common.currentApp.core.contactGroups
      .getContactGroups({
        where: filter,
      })
      .then(contactGroups => {
        contactGroups.forEach(contactGroup => {
          expect(contactGroup.Name.indexOf('Updated')).to.be.greaterThan(-1);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('creates a contact group', done => {
    const contactGroup = common.currentApp.core.contactGroups.newContactGroup(
      sampleContactGroup
    );

    contactGroup
      .save()
      .then(response => {
        expect(validateContactGroup(response.entities[0])).to.equal(true);
        sampleContactGroup.ContactGroupID = response.entities[0].ContactGroupID;
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('create multiple contact groups', done => {
    const contactGroups = [];

    for (let i = 0; i < 2; i += 1) {
      contactGroups.push(
        common.currentApp.core.contactGroups.newContactGroup({
          Name: `New Contacts ${Math.random()}`,
          Status: 'ACTIVE',
        })
      );
    }

    common.currentApp.core.contactGroups
      .saveContactGroups(contactGroups)
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(contactGroup => {
          expect(contactGroup.ContactGroupID).to.not.equal('');
          expect(contactGroup.ContactGroupID).to.not.equal(undefined);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('Updates a contact group', done => {
    const updatedName = `Updated ${Math.random()}`;
    common.currentApp.core.contactGroups
      .getContactGroup(sampleContactGroup.ContactGroupID)
      .then(contactGroup => {
        expect(validateContactGroup(contactGroup)).to.equal(true);
        contactGroup.Name = updatedName;
        return contactGroup.save();
      })
      .then(response => {
        expect(validateContactGroup(response.entities[0])).to.equal(true);
        expect(response.entities[0].Name).to.equal(updatedName);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('Adds a contact to a contact group', done => {
    const sampleContacts = [];
    common.currentApp.core.contacts
      .getContacts()
      .then(contacts => {
        for (let i = 0; i < 5; i += 1) {
          sampleContacts.push({
            ContactID: contacts[i].ContactID,
          });
        }
      })
      .then(() =>
        common.currentApp.core.contactGroups.getContactGroup(
          sampleContactGroup.ContactGroupID
        )
      )
      .then(contactGroup => {
        expect(validateContactGroup(contactGroup)).to.equal(true);
        return contactGroup.saveContacts(sampleContacts);
      })
      .then(response => {
        response.entities.forEach((contact, idx) => {
          expect(contact.ContactID).to.equal(sampleContacts[idx].ContactID);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('Deletes a specific contact from a contact group', done => {
    let contactIDToRemove = '';
    common.currentApp.core.contactGroups
      .getContactGroup(sampleContactGroup.ContactGroupID)
      .then(contactGroup => {
        expect(validateContactGroup(contactGroup)).to.equal(true);
        contactIDToRemove = contactGroup.Contacts[0].ContactID;
        return contactGroup.deleteContact(contactIDToRemove);
      })
      .then(() => {
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('Deletes all contacts from a contact group', done => {
    common.currentApp.core.contactGroups
      .getContactGroup(sampleContactGroup.ContactGroupID)
      .then(contactGroup => {
        expect(validateContactGroup(contactGroup)).to.equal(true);
        return contactGroup.deleteAllContacts();
      })
      .then(() => {
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('Deletes a contact group', done => {
    common.currentApp.core.contactGroups
      .getContactGroup(sampleContactGroup.ContactGroupID)
      .then(contactGroup => {
        expect(validateContactGroup(contactGroup)).to.equal(true);
        contactGroup.Status = 'DELETED';
        return contactGroup.save();
      })
      .then(response => {
        expect(validateContactGroup(response.entities[0])).to.equal(true);
        expect(response.entities[0].Status).to.equal('DELETED');
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
