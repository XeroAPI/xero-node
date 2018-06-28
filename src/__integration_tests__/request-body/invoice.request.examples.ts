import { Invoice } from '../../AccountingAPI-models';

const createSingleInvoiceRequest: Invoice = {
	Type: 'ACCREC',
	Contact: {
		Name: 'Martin Hudson'
	},
	Date: '2018-02-15T00:00:00',
	DueDate: '2018-02-22T00:00:00',
	Url: 'http://www.accounting20.com',
	LineAmountTypes: 'Exclusive',
	LineItems: [{
		Description: 'Monthly rental for property at 56a Wilkins Avenue',
		Quantity: 4.3400,
		UnitAmount: 395.00,
		AccountCode: '200'
	}]
};

const createMultipleInvoiceRequest: { Invoices: Invoice[] } = {
	Invoices: [
		createSingleInvoiceRequest, {
			Type: 'ACCREC',
			Contact: {
				Name: 'Martin Hudson'
			},
			Date: '2018-02-15T00:00:00',
			DueDate: '2018-02-22T00:00:00',
			LineAmountTypes: 'Exclusive',
			LineItems: [{
				Description: 'Monthly rental for property at 101a Wilkins Avenue',
				Quantity: 5.3400,
				UnitAmount: 35.00,
				AccountCode: '200'
			}]
		}
	]
};

const createEmailInvoiceRequest: Invoice = {
	Type: 'ACCREC',
	Contact: {
		Name: 'Martin Hudson',
		EmailAddress: 'test@test.com'
	},
	Date: '2018-02-15T00:00:00',
	DueDate: '2018-02-22T00:00:00',
	LineAmountTypes: 'Exclusive',
	Status: 'AUTHORISED',
	LineItems: [{
		Description: 'Monthly rental for property at 56a Email Avenue',
		Quantity: 4.3400,
		UnitAmount: 395.00,
		AccountCode: '200'
	}]
};

export {
	createSingleInvoiceRequest, createMultipleInvoiceRequest, createEmailInvoiceRequest
};
