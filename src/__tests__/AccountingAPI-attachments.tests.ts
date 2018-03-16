import { IXeroClientConfiguration } from '../internals/BaseAPIClient';
import { IOAuth1HttpClient } from '../internals/OAuth1HttpClient';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { validTestCertPath } from '../internals/__tests__/helpers/privateKey-helpers';
import * as fs from 'fs';
import * as path from 'path';
import { IFixture, IEndPointDetails } from './helpers/IFixture';

const guid1 = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';

const xeroConfig: IXeroClientConfiguration = {
	appType: 'private',
	consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
	consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
	privateKeyPath: validTestCertPath()
};

describe('AccountingAPI attachments', () => {
	const writeResponseToStreamSpy = jest.fn();
	const oAuth1HttpClient: IOAuth1HttpClient = {
		get: undefined,
		put: undefined,
		post: undefined,
		delete: undefined,
		writeResponseToStream: writeResponseToStreamSpy,
		setState: undefined,
		getState: undefined,
		getUnauthorisedRequestToken: undefined,
		buildAuthoriseUrl: undefined,
		swapRequestTokenforAccessToken: undefined,
		refreshAccessToken: undefined
	};

	const tempAttachmentLocation = path.resolve(__dirname, 'temp-image.jpg');

	// Invoices [x]
	// Receipts [ ]
	// Credit Notes [ ]
	// Repeating Invoices [ ]
	// Bank Transactions [ ]
	// Bank Transfers [ ]
	// Contacts [x]
	// Accounts [ ]
	// Manual Journals [ ]

	const fixtures: IFixture = {
		invoices: [
			{ action: 'downloadAttachment', expectedPath: `invoices/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityID: guid1, fileName: 'bean.jpg' } }
		],
		contacts: [
			{ action: 'downloadAttachment', expectedPath: `contacts/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityID: guid1, fileName: 'bean.jpg' } }
		]
	};

	const actionToSpyMap: { [key: string]: jest.Mock<{}> } = {
		downloadAttachment: writeResponseToStreamSpy
	};

	Object.keys(fixtures).map((endpoint: string) => {
		(fixtures[endpoint]).map((fixture: IEndPointDetails) => {

			describe(`${endpoint} attachments & ${fixture.action} calls`, () => {
				let result: any;

				beforeAll(async () => {
					jest.resetAllMocks();

					const streamToUse = fs.createReadStream(path.resolve(__dirname, 'helpers/bean.jpg'));
					writeResponseToStreamSpy.mockImplementation((endpointPath: string, mimeType: string, writeStream: fs.WriteStream) => {
						return new Promise<void>((resolve, reject) => {
							streamToUse.pipe(writeStream);
							streamToUse.on('end', () => {
								resolve();
							});
						});
					});

					const xeroClient = new AccountingAPIClient(xeroConfig, oAuth1HttpClient);

					result = await (xeroClient as any)[endpoint]['attachments'][fixture.action](fixture.args);
				});

				it(`calls the underlying HTTPClient method`, () => {
					expect(actionToSpyMap[fixture.action]).toHaveBeenCalledTimes(1);
				});

				it(`calls HTTPClient with endpoint=${fixture.expectedPath}`, () => {
					expect(actionToSpyMap[fixture.action].mock.calls[0][0]).toEqual(fixture.expectedPath);
				});

				it(`calls HTTPClient with mimeType=${fixture.args.mimeType}`, () => {
					expect(actionToSpyMap[fixture.action].mock.calls[0][1]).toEqual(fixture.args.mimeType);
				});

				it(`calls HTTPClient with writeStream path=${tempAttachmentLocation}`, () => {
					const writeStream = actionToSpyMap[fixture.action].mock.calls[0][2];
					expect(writeStream).toHaveProperty('path');
					expect(writeStream.path).toEqual(tempAttachmentLocation);
				});

				it('result is undefined', () => {
					expect(result).toBeUndefined();
				});

				it('saves attachment to disk', async () => {
					expect(fs.existsSync(tempAttachmentLocation)).toBeTruthy();
					const stat = fs.statSync(tempAttachmentLocation);
					expect(stat.size).toBe(23951);
				});

				afterAll(() => {
					fs.unlinkSync(tempAttachmentLocation);
				});
			});
		});
	});
});
