'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;

const currentApp = common.currentApp;

describe('contacts', () => {
  let sampleContact = {
    Name: `Johnnies Coffee ${Math.random()}`,
    FirstName: 'John',
    LastName: 'Smith',
    Addresses: [
      {
        AddressType: 'POBOX',
        AddressLine1: 'P O Box 123',
        City: 'Wellington',
        PostalCode: '6011',
        AttentionTo: 'Andrea',
      },
    ],
    SalesTrackingCategories: [
      {
        TrackingCategoryName: 'Region',
        TrackingOptionName: 'South',
      },
    ],
    PurchasesTrackingCategories: [
      {
        TrackingCategoryName: 'Region',
        TrackingOptionName: 'North',
      },
    ],
  };

  const contactIDsList = [];

  const newName = `Updated ${Math.random()}`;

  it('create single contact', done => {
    const contact = currentApp.core.contacts.newContact(sampleContact);
    contact
      .save()
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].ContactID).to.not.equal('');
        expect(response.entities[0].ContactID).to.not.equal(undefined);
        expect(response.entities[0].Name).to.equal(sampleContact.Name);
        expect(response.entities[0].FirstName).to.equal(
          sampleContact.FirstName
        );
        expect(response.entities[0].LastName).to.equal(sampleContact.LastName);

        expect(
          response.entities[0].Addresses.filter(
            address => address.City === sampleContact.Addresses[0].City
          ).length
        ).to.equal(1);

        sampleContact = response.entities[0];

        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
  it('get - modifiedAfter', done => {
    const modifiedDate = new Date();

    // take 30 seconds ago as we just created a contact
    modifiedDate.setTime(modifiedDate.getTime() - 10000);

    currentApp.core.contacts
      .getContacts({ modifiedAfter: modifiedDate })
      .then(contacts => {
        expect(contacts.length).to.equal(1);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get (no paging)', done => {
    currentApp.core.contacts
      .getContacts()
      .then(contacts => {
        contacts.forEach(contact => {
          expect(contact.ContactID).to.not.equal('');
          expect(contact.ContactID).to.not.equal(undefined);

          if (contactIDsList.length < 5) {
            contactIDsList.push(contact.ContactID);
          }
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get (paging)', done => {
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

  it('get by id', done => {
    currentApp.core.contacts
      .getContact(sampleContact.ContactID)
      .then(contact => {
        expect(contact.ContactID).to.equal(sampleContact.ContactID);
        expect(contact.SalesTrackingCategories[0].TrackingCategoryName).to.be.a(
          'String'
        );
        expect(contact.SalesTrackingCategories[0].TrackingOptionName).to.be.a(
          'String'
        );
        expect(
          contact.PurchasesTrackingCategories[0].TrackingCategoryName
        ).to.be.a('String');
        expect(
          contact.PurchasesTrackingCategories[0].TrackingOptionName
        ).to.be.a('String');
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get list of IDs', done => {
    currentApp.core.contacts
      .getContacts({
        params: {
          IDs: contactIDsList.toString(),
        },
      })
      .then(contacts => {
        contacts.forEach(contact => {
          expect(contact.ContactID).to.be.oneOf(contactIDsList);
        });

        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get - invalid modified date', done => {
    currentApp.core.contacts
      .getContacts({ modifiedAfter: 'cats' })
      .then(contacts => {
        expect(contacts.length).to.be.greaterThan(1);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('create multiple contacts', done => {
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
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(contact => {
          expect(contact.ContactID).to.not.equal('');
          expect(contact.ContactID).to.not.equal(undefined);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('update contact', done => {
    currentApp.core.contacts
      .getContact(sampleContact.ContactID)
      .then(response => {
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
      .then(updatedContact => {
        expect(updatedContact.entities[0].Name).to.equal(newName);
        expect(
          updatedContact.entities[0].Addresses.filter(
            address => address.City === 'Melbourne'
          ).length
        ).to.equal(1);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get attachments for contacts', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.contacts
      .getContacts({ where: filter })
      .then(contacts => {
        if (contacts.length === 0) done();
        let objectsProcessed = 0;
        contacts.forEach(contact => {
          contact
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === contacts.length &&
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
