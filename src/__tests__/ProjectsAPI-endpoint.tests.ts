import { XeroClientConfiguration } from '../internals/BaseAPIClient';
import { mapConfig, mapState } from '../internals/config-helper';
import { OAuth1HttpClient } from '../internals/OAuth1HttpClient';
import { InMemoryOAuthLibFactoryFactory } from '../internals/__tests__/helpers/InMemoryOAuthLib';
import { validTestCertPath } from '../internals/__tests__/helpers/privateKey-helpers';
import { ProjectsAPIClient } from '../ProjectsAPIClient';
import { IEndPointDetails, IFixture } from './helpers/IFixture';

describe('ProjectsAPI endpoints', () => {
	// const guid1 = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';
	// const guid2 = '857c9e3f-640a-4df2-99fd-dd0e52a785e7';

	const xeroConfig: XeroClientConfiguration = {
		appType: 'private',
		consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
		consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
		privateKeyPath: validTestCertPath()
	};

	const inMemoryOAuthLibFF = new InMemoryOAuthLibFactoryFactory();

	const oauthConfig = mapConfig(xeroConfig, { apiBasePath: '/projects.xro/1.0/' });
	const accountingBaseUrl = oauthConfig.apiBaseUrl;
	const oauthHttpClient = new OAuth1HttpClient(oauthConfig, mapState(xeroConfig), inMemoryOAuthLibFF.newFactory());
	const xeroClient = new ProjectsAPIClient(xeroConfig, null, oauthHttpClient);

	const actionToVerbMap: { [key: string]: string } = {
		create: 'put',
		delete: 'delete',
		update: 'post',
		get: 'get'
	};

	const fixtures: IFixture = {
		projects: [
			{ action: 'get', expectedPath: 'projects' },
		]
	};

	Object.keys(fixtures).map((endpoint: string) => {
		(fixtures[endpoint]).map((fixture: IEndPointDetails) => {

			describe(`${endpoint} ${fixture.subResource || ''}.${fixture.action}(${fixture.args ? Object.keys(fixture.args) : ''})`, () => {
				let result: any;

				const mockedResponse = JSON.stringify({ a: 'response' });

				const hasRequestBody = (fixture.action == 'create' || fixture.action == 'update');
				const mockedRequestBody = hasRequestBody ? { a: 'request' } : null;

				beforeAll(async () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.reset();
					inMemoryOAuthLibFF.inMemoryOAuthLib.setResponse(false, mockedResponse, { statusCode: 200 });

					if (fixture.subResource) {
						mockedRequestBody
							? result = await (xeroClient as any)[endpoint][fixture.subResource][fixture.action](mockedRequestBody, fixture.args)
							: result = await (xeroClient as any)[endpoint][fixture.subResource][fixture.action](fixture.args);
					} else {
						mockedRequestBody
							? result = await (xeroClient as any)[endpoint][fixture.action](mockedRequestBody, fixture.args)
							: result = await (xeroClient as any)[endpoint][fixture.action](fixture.args);
					}
				});

				it(`calls the ${fixture.expectedPath} endpoint`, () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisURL(accountingBaseUrl + '/projects.xro/1.0/' + fixture.expectedPath);
				});

				it(`calls the ${actionToVerbMap[fixture.action]} verb`, () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisMethod(actionToVerbMap[fixture.action]);
				});

				if (fixture.args && fixture.args.headers) {
					it(`calls with expected headers`, () => {
						inMemoryOAuthLibFF.inMemoryOAuthLib.lastHadThisHeader(fixture.args.headers);
					});
				}

				it('requested with expected body', () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastRequestedHadBody(mockedRequestBody);
				});

				it('matches the expected response', () => {
					expect(result).toMatchObject(JSON.parse(mockedResponse));
				});
			});
		});

	});
});
