export interface IEndPointDetails {
	action: string;
	expectedPath: string;
	subResource?: string;
	args?: any;
}

export interface IFixture {
	[key: string]: IEndPointDetails[];
}
