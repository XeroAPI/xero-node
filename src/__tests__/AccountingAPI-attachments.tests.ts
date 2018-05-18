import { XeroClientConfiguration } from '../internals/BaseAPIClient';
import { IOAuth1HttpClient } from '../internals/OAuth1HttpClient';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { validTestCertPath } from '../internals/__tests__/helpers/privateKey-helpers';
import * as fs from 'fs';
import * as path from 'path';
import { IFixture, IEndPointDetails } from './helpers/IFixture';

const guid1 = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';

const xeroConfig: XeroClientConfiguration = {
	appType: 'private',
	consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
	consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
	privateKeyPath: validTestCertPath()
};

describe('AccountingAPI attachments', () => {
	const writeBinaryResponseToStreamSpy = jest.fn();
	const readStreamToRequestSpy = jest.fn();

	const oAuth1HttpClient: IOAuth1HttpClient = {
		get: undefined,
		put: undefined,
		post: undefined,
		delete: undefined,
		writeUTF8ResponseToStream: undefined,
		writeBinaryResponseToStream: writeBinaryResponseToStreamSpy,
		readStreamToRequest: readStreamToRequestSpy,
		getRequestToken: undefined,
		buildAuthoriseUrl: undefined,
		swapRequestTokenforAccessToken: undefined,
		refreshAccessToken: undefined
	};

	const tempAttachmentLocation = path.resolve(__dirname, 'temp-image.jpg');
	const localAttachmentLocation = path.resolve(__dirname, 'helpers', 'bean.jpg');
	const localAttachmentLocation2 = path.resolve(__dirname, 'helpers', 'bean#2.jpg');

	const fixtures: IFixture = {
		invoices: [
			{ expectedPath: `invoices/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityId: guid1, fileName: 'bean.jpg' } },
			{ expectedPath: `invoices/${guid1}/attachments/bean%232.jpg`, args: { mimeType: 'image/jpg', pathToSave: localAttachmentLocation2, entityId: guid1, fileName: 'bean#2.jpg' } }
		],
		bankTransactions: [
			{ expectedPath: `banktransactions/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityId: guid1, fileName: 'bean.jpg' } },
			{ expectedPath: `banktransactions/${guid1}/attachments/bean%232.jpg`, args: { mimeType: 'image/jpg', pathToSave: localAttachmentLocation2, entityId: guid1, fileName: 'bean#2.jpg' } }
		],
		creditNotes: [
			{ expectedPath: `creditnotes/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityId: guid1, fileName: 'bean.jpg' } },
			{ expectedPath: `creditnotes/${guid1}/attachments/bean%232.jpg`, args: { mimeType: 'image/jpg', pathToSave: localAttachmentLocation2, entityId: guid1, fileName: 'bean#2.jpg' } }
		],
		repeatingInvoices: [
			{ expectedPath: `repeatinginvoices/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityId: guid1, fileName: 'bean.jpg' } },
			{ expectedPath: `repeatinginvoices/${guid1}/attachments/bean%232.jpg`, args: { mimeType: 'image/jpg', pathToSave: localAttachmentLocation2, entityId: guid1, fileName: 'bean#2.jpg' } }
		],
		bankTransfers: [
			{ expectedPath: `banktransfers/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityId: guid1, fileName: 'bean.jpg' } },
			{ expectedPath: `banktransfers/${guid1}/attachments/bean%232.jpg`, args: { mimeType: 'image/jpg', pathToSave: localAttachmentLocation2, entityId: guid1, fileName: 'bean#2.jpg' } }
		],
		contacts: [
			{ expectedPath: `contacts/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityId: guid1, fileName: 'bean.jpg' } },
			{ expectedPath: `contacts/${guid1}/attachments/bean%232.jpg`, args: { mimeType: 'image/jpg', pathToSave: localAttachmentLocation2, entityId: guid1, fileName: 'bean#2.jpg' } }
		],
		accounts: [
			{ expectedPath: `accounts/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityId: guid1, fileName: 'bean.jpg' } },
			{ expectedPath: `accounts/${guid1}/attachments/bean%232.jpg`, args: { mimeType: 'image/jpg', pathToSave: localAttachmentLocation2, entityId: guid1, fileName: 'bean#2.jpg' } }
		],
		manualJournals: [
			{ expectedPath: `manualjournals/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityId: guid1, fileName: 'bean.jpg' } },
			{ expectedPath: `manualjournals/${guid1}/attachments/bean%232.jpg`, args: { mimeType: 'image/jpg', pathToSave: localAttachmentLocation2, entityId: guid1, fileName: 'bean#2.jpg' } }
		]
	};

	Object.keys(fixtures).map((endpoint: string) => {
		(fixtures[endpoint]).map((fixture: IEndPointDetails) => {
			describe(`${endpoint} attachments & downloadAttachment calls`, () => {
				let result: any;

				beforeAll(async () => {
					jest.resetAllMocks();

					const streamToUse = fs.createReadStream(path.resolve(__dirname, 'helpers/bean.jpg'));
					writeBinaryResponseToStreamSpy.mockImplementation((endpointPath: string, mimeType: string, writeStream: fs.WriteStream) => {
						return new Promise<void>((resolve, reject) => {
							streamToUse.pipe(writeStream);
							streamToUse.on('end', () => {
								resolve();
							});
						});
					});

					const xeroClient = new AccountingAPIClient(xeroConfig, null, oAuth1HttpClient);

					result = await (xeroClient as any)[endpoint]['attachments'].downloadAttachment(fixture.args);
				});

				it(`calls the underlying HTTPClient method`, () => {
					expect(writeBinaryResponseToStreamSpy).toHaveBeenCalledTimes(1);
				});

				it(`calls HTTPClient with endpoint=${fixture.expectedPath}`, () => {
					expect(writeBinaryResponseToStreamSpy.mock.calls[0][0]).toEqual(fixture.expectedPath);
				});

				it(`calls HTTPClient with mimeType=${fixture.args.mimeType}`, () => {
					expect(writeBinaryResponseToStreamSpy.mock.calls[0][1]).toEqual(fixture.args.mimeType);
				});

				it(`calls HTTPClient with writeStream path=${tempAttachmentLocation}`, () => {
					const writeStream = writeBinaryResponseToStreamSpy.mock.calls[0][2];
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

			describe(`${endpoint} attachments & uploading attachment`, () => {
				let response: any;

				beforeAll(async () => {
					jest.resetAllMocks();

					readStreamToRequestSpy.mockImplementation((endpointPath: string, mimeType: string, size: number, writeStream: fs.WriteStream) => {
						return new Promise<void>((resolve, reject) => {
							resolve();
						});
					});

					const xeroClient = new AccountingAPIClient(xeroConfig, null, oAuth1HttpClient);

					response = await (xeroClient as any)[endpoint]['attachments'].uploadAttachment({
						entityId: fixture.args.entityId,
						mimeType: fixture.args.mimeType,
						fileName: fixture.args.fileName,
						pathToUpload: localAttachmentLocation
					});
				});

				it(`calls the underlying HTTPClient method`, () => {
					expect(readStreamToRequestSpy).toHaveBeenCalledTimes(1);
				});

				it(`calls HTTPClient with endpoint=${fixture.expectedPath}`, () => {
					expect(readStreamToRequestSpy.mock.calls[0][0]).toEqual(fixture.expectedPath);
				});

				it(`calls HTTPClient with mimeType=${fixture.args.mimeType}`, () => {
					expect(readStreamToRequestSpy.mock.calls[0][1]).toEqual(fixture.args.mimeType);
				});

				it(`calls HTTPClient with correct size`, () => {
					expect(readStreamToRequestSpy.mock.calls[0][2]).toEqual(23951);
				});

				it(`calls HTTPClient with readStream path=${localAttachmentLocation}`, () => {
					const readStream = readStreamToRequestSpy.mock.calls[0][3];
					expect(readStream).toHaveProperty('path');
					expect(readStream.path).toEqual(localAttachmentLocation);
				});

				it('result is undefined', () => {
					expect(response).toBeUndefined();
				});
			});
		});
	});
});
