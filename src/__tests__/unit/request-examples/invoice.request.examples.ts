import { Invoice } from '../../../interfaces/AccountingResponse';

const createInvoiceRequest: Invoice = {
	Type: 'ACCREC',
	Contact: {
		Name: 'Martin Hudson'
	},
	Date: '2018-02-15T00:00:00',
	DueDate: '2018-02-22T00:00:00',
	LineAmountTypes: 'Exclusive',
	LineItems: [{
		Description: 'Monthly rental for property at 56a Wilkins Avenue',
		Quantity: 4.3400,
		UnitAmount: 395.00,
		AccountCode: '200'
	}]
};

export {
	createInvoiceRequest
};
