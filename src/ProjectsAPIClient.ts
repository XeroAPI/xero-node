import { BaseAPIClient, XeroClientConfiguration } from './internals/BaseAPIClient';
import { AccessToken, IOAuth1HttpClient } from './internals/OAuth1HttpClient';
import { ProjectsResponse, ProjectResponse } from './ProjectsAPI-responses';

export class ProjectsAPIClient extends BaseAPIClient {

	public constructor(options: XeroClientConfiguration, authState?: AccessToken, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(options, authState, { apiBasePath: '/projects.xro/1.0/' }, _oAuth1HttpClient);
	}

	public projects = {
		get: async (args?: { projectId?: string, projectIds?: string[], contactID?: string, states?: string }): Promise<ProjectsResponse> => {
			let endpoint = 'projects';

			if (args && args.projectId) {
				endpoint = endpoint + '/' + args.projectId;
				delete args.projectId;
			}

			endpoint += generateProjectsQueryString(args);

			return this.oauth1Client.get<ProjectsResponse>(endpoint);
		},

		post: async (args: { contactId: string; Name: string; deadlineUtc?: string; estimateAmount?: number }): Promise<ProjectResponse> => {
			let endpoint = "projects";

			return this.oauth1Client.post<ProjectResponse>(endpoint, args);
		}
	};
}

function generateProjectsQueryString(args: { projectId?: string, projectIds?: string[], contactID?: string, states?: string }) {
	if (!args) {
		return '';
	}
}
