import { BaseAPIClient, XeroClientConfiguration } from './internals/BaseAPIClient';
import { AccessToken, IOAuth1HttpClient } from './internals/OAuth1HttpClient';
import { ProjectsResponse } from './ProjectsAPI-responses';
import { Project } from './ProjectsAPI-models';
import { generateQueryString } from './internals/utils';

export class ProjectsAPIClient extends BaseAPIClient {

	public constructor(options: XeroClientConfiguration, authState?: AccessToken, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(options, authState, { apiBasePath: '/projects.xro/1.0/' }, _oAuth1HttpClient);
	}

	public projects = {
		get: async (args?: { projectIds?: string[], contactID?: string, states?: string }): Promise<ProjectsResponse> => {
			let endpoint = 'projects';
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<ProjectsResponse>(endpoint);
		},
		getSingle: async (args: { projectId: string }): Promise<Project> => {
			let endpoint = 'projects';
			if (args && args.projectId) {
				endpoint = endpoint + '/' + args.projectId;
				delete args.projectId;
			}
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<Project>(endpoint);
		},
		create: async (args: { contactId: string; Name: string; deadlineUtc?: string; estimateAmount?: number }): Promise<Project> => {
			const endpoint = 'projects';

			return this.oauth1Client.post<Project>(endpoint, args);
		},
	};
}
