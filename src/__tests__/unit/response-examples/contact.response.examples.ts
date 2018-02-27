import { ContactsResponse } from '../../../interfaces/AccountingResponse';

export const getSingle: ContactsResponse = {
	Id: '1ab1ca3d-9305-4473-bfa2-82cd5985e736',
	Status: 'OK',
	ProviderName: 'Xero API Previewer',
	DateTimeUTC: '\/Date(1518817677052)\/',
	Contacts: [
		{
			ContactID: '899985a6-f05c-40e7-a18b-28eb760df75b',
			ContactStatus: 'ACTIVE',
			Name: 'Martin Hudson',
			EmailAddress: '',
			BankAccountDetails: '',
			Addresses: [
				{
					AddressType: 'STREET',
					City: '',
					Region: '',
					PostalCode: '',
					Country: ''
				},
				{
					AddressType: 'POBOX',
					City: '',
					Region: '',
					PostalCode: '',
					Country: ''
				}
			],
			Phones: [
				{
					PhoneType: 'DDI',
					PhoneNumber: '',
					PhoneAreaCode: '',
					PhoneCountryCode: ''
				},
				{
					PhoneType: 'DEFAULT',
					PhoneNumber: '',
					PhoneAreaCode: '',
					PhoneCountryCode: ''
				},
				{
					PhoneType: 'FAX',
					PhoneNumber: '',
					PhoneAreaCode: '',
					PhoneCountryCode: ''
				},
				{
					PhoneType: 'MOBILE',
					PhoneNumber: '',
					PhoneAreaCode: '',
					PhoneCountryCode: ''
				}
			],
			UpdatedDateUTC: '\/Date(1518685950940+0000)\/',
			ContactGroups: [],
			IsSupplier: false,
			IsCustomer: true,
			ContactPersons: [],
			HasAttachments: false,
			Attachments: [],
			HasValidationErrors: false
		}
	]
};

export const getAll: ContactsResponse = {
	Id: '7232c7ce-75b5-4eb7-8a1b-7ca33a10e2ba',
	Status: 'OK',
	ProviderName: 'Xero API Previewer',
	DateTimeUTC: '\/Date(1518817920585)\/',
	Contacts: [
		{
			ContactID: '899985a6-f05c-40e7-a18b-28eb760df75b',
			ContactStatus: 'ACTIVE',
			Name: 'Martin Hudson',
			EmailAddress: '',
			BankAccountDetails: '',
			Addresses: [
				{
					AddressType: 'STREET',
					City: '',
					Region: '',
					PostalCode: '',
					Country: ''
				},
				{
					AddressType: 'POBOX',
					City: '',
					Region: '',
					PostalCode: '',
					Country: ''
				}
			],
			Phones: [
				{
					PhoneType: 'DDI',
					PhoneNumber: '',
					PhoneAreaCode: '',
					PhoneCountryCode: ''
				},
				{
					PhoneType: 'DEFAULT',
					PhoneNumber: '',
					PhoneAreaCode: '',
					PhoneCountryCode: ''
				},
				{
					PhoneType: 'FAX',
					PhoneNumber: '',
					PhoneAreaCode: '',
					PhoneCountryCode: ''
				},
				{
					PhoneType: 'MOBILE',
					PhoneNumber: '',
					PhoneAreaCode: '',
					PhoneCountryCode: ''
				}
			],
			UpdatedDateUTC: '\/Date(1518685950940+0000)\/',
			ContactGroups: [],
			IsSupplier: false,
			IsCustomer: true,
			ContactPersons: [],
			HasAttachments: false,
			HasValidationErrors: false
		},
		{
			ContactID: '565acaa9-e7f3-4fbf-80c3-16b081ddae10',
			ContactStatus: 'ACTIVE',
			Name: 'Southside Office Supplies',
			Addresses: [
				{
					AddressType: 'POBOX'
				},
				{
					AddressType: 'STREET'
				}
			],
			Phones: [
				{
					PhoneType: 'DDI'
				},
				{
					PhoneType: 'DEFAULT'
				},
				{
					PhoneType: 'FAX'
				},
				{
					PhoneType: 'MOBILE'
				}
			],
			UpdatedDateUTC: '\/Date(1518717821980+0000)\/',
			ContactGroups: [],
			IsSupplier: false,
			IsCustomer: false,
			ContactPersons: [],
			HasAttachments: false,
			HasValidationErrors: false
		}
	]
};
