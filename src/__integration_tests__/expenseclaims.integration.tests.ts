import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { ExpenseClaimsResponse } from '../AccountingAPI-responses';
import { getOrCreateExpenseClaimId } from './helpers/entityId.helpers';

describe('/expenseclaims', () => {
	let xero: AccountingAPIClient;
	let idsToArchive: string[] = [];

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('create single', async () => {
		const response = await xero.expenseclaims.create({
			AmountDue: 123
		});

		collectIdsToArchive(response);

		expect(response.ExpenseClaims.length).toBe(1);
		expect(response.ExpenseClaims[0].AmountDue).toEqual(123);
	});

	it('get single', async () => {
		const response = await xero.expenseclaims.get({ ExpenseClaimID: await getOrCreateExpenseClaimId(xero) });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.ExpenseClaims.length).toBe(1);
		expect(response.ExpenseClaims[0].ExpenseClaimID).toBeTruthy();
	});

	it('get all', async () => {
		const response = await xero.expenseclaims.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.ExpenseClaims.length).toBeGreaterThan(0);
		expect(response.ExpenseClaims[0].ExpenseClaimID).toBeTruthy();
	});

	it('update', async () => {
		const response = await xero.expenseclaims.update({
			ExpenseClaimID: await getOrCreateExpenseClaimId(xero),
			Status: 'VOIDED'
		});

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.ExpenseClaims.length).toBe(1);
		expect(response.ExpenseClaims[0].ExpenseClaimID).toBeTruthy();
		expect(response.ExpenseClaims[0].Status).toEqual('VOIDED');
	});

	afterAll(async () => {

		const expenseClaimsToUpdate = idsToArchive.map((id) => ({
			ExpenseClaimID: id,
			Status: 'VOIDED'
		}));

		await xero.expenseclaims.update({
			ExpenseClaims: expenseClaimsToUpdate
		});
	});

	function collectIdsToArchive(response: ExpenseClaimsResponse) {
		idsToArchive = idsToArchive.concat(response.ExpenseClaims.map((expenseClaim) => expenseClaim.ExpenseClaimID));
	}
});
