import { ContactsResponse } from '../AccountingAPI-responses';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/contacts', () => {

	let xero: AccountingAPIClient;

	let contactIdsToArchive: string[] = [];

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('create contacts', async () => {
		const response = await xero.contacts.create({
			Contacts: [{
				Name: 'Bryan Tee' + new Date()
			}, {
				Name: 'Phil Tee' + new Date()
			}]
		});

		collectContactsToArchive(response);

		expect(response.Contacts.length).toBe(2);
		expect(response.Contacts[0].Name).toContain('Bryan');
		expect(response.Contacts[1].Name).toContain('Phil');
	});

	it('gets a contact by ID', async () => {
		const response = await xero.contacts.get({ ContactID: contactIdsToArchive[0] });

		expect(response.Contacts[0].ContactID).toBeDefined();
	});

	it('can get history', async () => {
		const response = await xero.contacts.history.get({ ContactID: contactIdsToArchive[0] });
		
		expect(response.HistoryRecords[0]).toBeDefined();
	});

	afterAll(async () => {
		// And this is how you update
		const contactsToUpdate = contactIdsToArchive.map((contactId) => ({
			ContactID: contactId,
			Status: 'ARCHIVED'
		}));

		await xero.contacts.update({
			Contacts: contactsToUpdate
		});
	});

	function collectContactsToArchive(response: ContactsResponse) {
		contactIdsToArchive = contactIdsToArchive.concat(response.Contacts.map((contact) => contact.ContactID));
	}
});
