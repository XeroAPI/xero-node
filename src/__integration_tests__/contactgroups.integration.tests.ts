
import { AccountingAPIClient } from '../AccountingAPIClient';
import { ContactGroupsResponse, ContactGroup } from '../AccountingAPI-types';
import { getConfig } from './helpers/integration.helpers';
import { isUUID } from './helpers/test-assertions';

const data = getConfig();
const xero = new AccountingAPIClient(data);

describe('/contactgroups integration tests', () => {

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

		describe('and Creating and Getting, then deleting', () => {

			let createResult: ContactGroupsResponse = null;
			const uniqueName = 'NewContactGroup' + new Date().getTime();

			beforeAll(async () => {
				const contactGroup: ContactGroup = {
					Name: uniqueName,
					Status: 'ACTIVE'
				};

				createResult = await xero.contactgroups.create(contactGroup);
			});

			it('can be retrieved', async () => {
				const id = createResult.ContactGroups[0].ContactGroupID;
				const response = await xero.contactgroups.get({ ContactGroupID: id });
				expect(response.ContactGroups[0].Name).toBe(uniqueName);
			});

			it('result is defined', () => {
				expect(createResult).not.toBeNull();
			});

			it('we have a new ContactGroupID', () => {
				expect(isUUID(createResult.ContactGroups[0].ContactGroupID)).toBeTruthy();
			});

			it('404 throws and error as expected when contactgoup does not exist', async () => {
				expect.assertions(2);

				try {
					await xero.contactgroups.get({ ContactGroupID: 'b780e528-57f5-4fd1-83c1-b82e4990fc01' }); // Is randome guid
				} catch (error) {
					expect(error.statusCode).toBe(404);
					expect(error.body).toBe('The resource you\'re looking for cannot be found');
				}
			});

			it('when deleting all contacts, then all contacts are gone', async () => {
				// TODO: Add contact to group
				const id = createResult.ContactGroups[0].ContactGroupID;

				const deleteResult = await xero.contactgroups.contacts.delete({ ContactGroupID: id });
				// TODO: What do we want the delete result to be?
				expect(deleteResult).toBeNull();

				const getResult = await xero.contactgroups.get({ ContactGroupID: id });
				expect(getResult.ContactGroups[0].Contacts.length).toBe(0);
				expect(getResult.ContactGroups[0].Status).toBe('ACTIVE');
			});

			it('deletes the contact group', async () => {
				expect.assertions(5);
				createResult.ContactGroups[0].Status = 'DELETED';

				const deleteResult = await xero.contactgroups
					.update(createResult.ContactGroups[0]);

				expect(deleteResult).not.toBeNull();
				expect(deleteResult.ContactGroups.length).toBe(1);
				expect(deleteResult.ContactGroups[0].Status).toBe('DELETED');
				expect(deleteResult.ContactGroups[0].ContactGroupID).toBe(createResult.ContactGroups[0].ContactGroupID);

				try {
					await xero.contactgroups.get({ ContactGroupID: createResult.Id });
				} catch (error) {
					expect(error.statusCode).toBe(404);
				}
			});
		});

	});

});
