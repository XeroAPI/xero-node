import { ContactGroup, ContactGroupsResponse } from '../../interfaces/AccountingResponse';
import { XeroAPIClient } from '../../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { allContactGroups, createResponse, updateDeleted } from './response-examples/contactgroups.response.examples';
import { InMemoryOAuth } from './InMenoryOAuth';

const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

describe('/contactgroups', () => {
	describe('and getting', () => {
		describe('all contact groups', () => {
			let result: ContactGroupsResponse;
			const inMemoryOAuth = new InMemoryOAuth();

			beforeAll(async () => {
				inMemoryOAuth.callbackResultsForNextCall(null, JSON.stringify(allContactGroups), { statusCode: 200 });

				const xeroClient = new XeroAPIClient({
					AppType: 'private',
					ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
					PrivateKeyCert: privateKey
				}, null, inMemoryOAuth);

				result = await xeroClient.contactgroups.get();
			});

			it('the response is defined', () => {
				expect(result).not.toBeNull();
			});

			it('matches the expected response', () => {
				expect(result).toMatchObject(allContactGroups);
			});

			it('called the correct URL', () => {
				inMemoryOAuth.lastCalledThisURL('https://api.xero.com/api.xro/2.0/contactgroups');
			});
		});

	});

	describe('and creating', () => {
		describe('a contact groups', () => {
			let result: ContactGroupsResponse;
			const inMemoryOAuth = new InMemoryOAuth();

			beforeAll(async () => {
				inMemoryOAuth.callbackResultsForNextCall(null, JSON.stringify(createResponse), { stausCode: 200 });

				const xeroClient = new XeroAPIClient({
					AppType: 'private',
					ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
					PrivateKeyCert: privateKey
				}, null, inMemoryOAuth);

				const contactGroup: ContactGroup = {
					Name: 'NewContactGroup',
					Status: 'ACTIVE'
				};

				result = await xeroClient.contactgroups.create(contactGroup);
			});

			it('the response is defined', () => {
				expect(result).not.toBeNull();
			});

			it('matches the expected response', () => {
				expect(result).toMatchObject(createResponse);
			});

			it('called the correct URL', () => {
				inMemoryOAuth.lastCalledThisURL('https://api.xero.com/api.xro/2.0/contactgroups?summarizeErrors=false');
			});
		});

	});

	describe('and deleting via update', () => {
		describe('a contact groups', () => {
			let result: ContactGroupsResponse;
			const inMemoryOAuth = new InMemoryOAuth();

			const id = '4ceb0357-73ba-45e4-a288-57418e0a3587';

			beforeAll(async () => {
				inMemoryOAuth.callbackResultsForNextCall(null, JSON.stringify(updateDeleted), { stausCode: 200 });

				const xeroClient = new XeroAPIClient({
					AppType: 'private',
					ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
					PrivateKeyCert: privateKey
				}, null, inMemoryOAuth);

				const contactGroup: ContactGroup = {
					Name: 'NewContactGroup',
					Status: 'DELETED'
				};

				result = await xeroClient.contactgroups.update(contactGroup, { ContactGroupID: id });
			});

			it('the response is defined', () => {
				expect(result).not.toBeNull();
			});

			it('matches the expected response', () => {
				expect(result).toMatchObject(updateDeleted);
			});

			it('called the correct URL', () => {
				inMemoryOAuth.lastCalledThisURL(`https://api.xero.com/api.xro/2.0/contactgroups/${id}?summarizeErrors=false`);
			});
		});

	});
});
