import { Project } from './ProjectsAPI-models';

/** @private */
export interface PaginatedResponse {
	pagination?: {
		page: number,
		pageSize: number,
		pageCount: number,
		itemCount: number
	};
}

/** @private */
export interface ProjectsResponse extends PaginatedResponse {
	items: Project[];
}
