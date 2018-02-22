const allCurrenciesResponse = {
	Id: 'c556e468-affc-48ee-ac8c-701d03b572b5',
	Status: 'OK',
	ProviderName: 'Node - Private',
	DateTimeUTC: '/Date(1519269698528)/',
	Currencies: [
		{ Code: 'AUD', Description: 'Australian Dollar' },
		{ Code: 'JPY', Description: 'Japanese Yen' },
		{ Code: 'PHP', Description: 'Philippine Peso' },
		{ Code: 'SGD', Description: 'Singapore Dollar' },
		{ Code: 'USD', Description: 'United States Dollar' }
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

export {
	allCurrenciesResponse, createResponse
};
