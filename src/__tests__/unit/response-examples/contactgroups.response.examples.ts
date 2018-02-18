const allContactGroups = {
	Id: '021c4c92-2c05-4516-b7af-50286f8c147a',
	Status: 'OK',
	ProviderName: 'Xero API Previewer',
	DateTimeUTC: '\/Date(1518300837185)\/',
	ContactGroups: [
		{
			ContactGroupID: '3567ace4-1dc9-40b3-b364-9b55d5841b22',
			Name: 'Contractors',
			Status: 'ACTIVE',
			Contacts: [],
			HasValidationErrors: false
		},
		{
			ContactGroupID: 'fb64fc23-d0f4-4236-a031-709d391df9e4',
			Name: 'New Contacts 0.5082412871686646',
			Status: 'ACTIVE',
			Contacts: [],
			HasValidationErrors: false
		},
		{
			ContactGroupID: '26fcca8d-a03b-4968-a80a-a463d5bf30ee',
			Name: 'Support Clients (monthly)',
			Status: 'ACTIVE',
			Contacts: [],
			HasValidationErrors: false
		}
	]
};

const createResponse = {
	Id: '610ca62d-6084-4aa2-adee-d77759eb0a84',
	Status: 'OK',
	ProviderName: 'Xero API Previewer',
	DateTimeUTC: '2018-02-11T06:21:00.4469042Z',
	ContactGroups: {
		ContactGroup: {
			ContactGroupID: '96286440-3c1e-4825-b744-bcc53683d7d6',
			Name: 'VIP Customers',
			Status: 'ACTIVE'
		}
	}
};

const createValidationResponse = {
	ApiException: {
		ErrorNumber: '10',
		Type: 'ValidationException',
		Message: 'A validation exception occurred',
		Elements: {
			DataContractBase: {
				ValidationErrors: {
					ValidationError: {
						Message: 'A contact group with name \'Preferred Suppliers\' cannot be created. An contact group by that name already exists.'
					}
				},
				ContactGroupID: '00000000-0000-0000-0000-000000000000',
				Name: 'Preferred Suppliers',
			}
		}
	}
};

export {
	allContactGroups, createResponse
};
