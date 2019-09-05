import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { ProjectsAPIClient } from '../ProjectsAPIClient';
import { AccountingAPIClient } from '../AccountingAPIClient';

describe('/projects', () => {
	let xero: ProjectsAPIClient;
	let contactId: string;
	let existingId: string;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();

		const xeroAccounting = new AccountingAPIClient(config);
		const contacts = await xeroAccounting.contacts.get({ pageSize: 1 });
		contactId = contacts.Contacts[0].ContactID;

		xero = new ProjectsAPIClient(config);
	});

	it('create', async () => {
		const response = await xero.projects.create({
			contactId: contactId,
			Name: 'New Kitchen',
			deadlineUtc: '2017-04-23T18:25:43.511Z',
			estimateAmount: 99.99
		});

		expect(response.contactId).toBe(contactId);
		expect(response.status).toBe('INPROGRESS');

		existingId = response.projectId;
	});

	it('get all', async () => {
		const response = await xero.projects.get();

		expect(response).toBeDefined();
		expect(response.items).toBeTruthy();
		expect(response.items.length).toBeGreaterThan(0);
		if (response.items.length < 50) { // default page size
			expect(response.items.map((project) => project.projectId)).toContain(existingId);
		}
	});

	it('get by ContactID and status', async () => {
		const response = await xero.projects.get({ contactID: contactId, states: 'INPROGRESS' });

		expect(response).toBeDefined();
		expect(response.items).toBeTruthy();
		expect(response.items.length).toBeGreaterThan(0);
		if (response.items.length < 50) { // default page size
			expect(response.items.map((project) => project.projectId)).toContain(existingId);
		}
	});

	it('get single', async () => {
		const response = await xero.projects.getSingle({ projectId: existingId });

		expect(response).toBeDefined();
		expect(response.projectId).toEqual(existingId);
	});
});
