import { BankTransaction } from '../gen/model/accounting/bankTransaction';

describe('BankTransaction', () => {
	it('includes BatchPayment in the attribute map', () => {
		expect(BankTransaction.getAttributeTypeMap()).toEqual(
			expect.arrayContaining([
				{
					name: 'batchPayment',
					baseName: 'BatchPayment',
					type: 'BatchPayment',
				},
			]),
		);
	});
});
