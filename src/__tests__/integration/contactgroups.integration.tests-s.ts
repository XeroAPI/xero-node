
import { XeroAPIClient } from '../../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { ContactGroupsResponse, ContactGroup } from '../../interfaces/AccountingResponse';
import { isUUID } from '../test-helpers';

const privateKeyFile = path.resolve('C:\\keys\\privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

const data = require('./config.json');
const xero = new XeroAPIClient({ ...data, ...{ privateKey: privateKey } });

describe('/contactgroups inegration tests', () => {

	describe('and GETing', () => {

		describe('all ContactGroups', () => {
			let result: ContactGroupsResponse;

			beforeAll(async () => {
				result = await xero.contactgroups.get();
			});

			it('the response is defined', () => {
				expect(result).not.toBeNull();
			});

			it('response.Id is a Guid and is actually the Id of the request', async () => {
				expect(isUUID(result.Id)).toBeTruthy();
			});

			it('contactgroups has a length greater than 0', async () => {
				expect(result.ContactGroups.length).toBeGreaterThan(0);
			});
		});

		describe('and Creating and Getting', () => {

			let result: ContactGroupsResponse = null;
			const uniqueName = 'NewContactGroup' + new Date().getTime();

			beforeAll(async () => {
				const contactGroup: ContactGroup = {
					Name: uniqueName,
					Status: 'ACTIVE'
				};

				result = await xero.contactgroups.create(contactGroup);
			});

			it('can be retrieved', async () => {
				const id = result.ContactGroups[0].ContactGroupID;
				const response = await xero.contactgroups.get({ ContactGroupID: id });
				expect(response.ContactGroups[0].Name).toBe(uniqueName);
			});

			it('result is defined', () => {
				expect(result).not.toBeNull();
			});

			it('we have a new ContactGroupID', () => {
				expect(isUUID(result.ContactGroups[0].ContactGroupID)).toBeTruthy();
			});

			it('404 throws and error as expected when contactgoup does not exist', async () => {
				// TODO: Add contact to group
				expect.assertions(2);

				try {
					const getResult = await xero.contactgroups.get({ ContactGroupID: 'b780e528-57f5-4fd1-83c1-b82e4990fc01' }); // Is randome guid
				} catch (error) {
					expect(error.statusCode).toBe(404);
					expect(error.body).toBe('The resource you\'re looking for cannot be found');
				}
			});

			it('when deleting all contacts, then all contacts are gone', async () => {
				// TODO: Add contact to group
				const id = result.ContactGroups[0].ContactGroupID;

				const deleteResult = await xero.contactgroups.deleteContacts({ ContactGroupID: id });
				// TODO: What do we want the delete result to be?
				expect(deleteResult).toBeNull();

				const getResult = await xero.contactgroups.get({ ContactGroupID: id });
				expect(getResult.ContactGroups[0].Contacts.length).toBe(0);
				expect(getResult.ContactGroups[0].Status).toBe('ACTIVE');
			});

			// TODO: Delete the CG by updating it's status to DELETED
		});

	});

});
