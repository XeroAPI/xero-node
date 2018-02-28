import { AccountingAPIClient } from '../../endpoints/AccountingAPIClient';
import { EmployeesResponse } from '../../interfaces/AccountingAPI';
import { getConfig } from './integration.helpers';

const data = getConfig();
const xero = new AccountingAPIClient(data);

describe('/employees integration tests', () => {
	describe('and creating and getting', () => {
		let result: EmployeesResponse;

		beforeAll(async () => {
			try {
				await xero.employees.create({FirstName: 'Bryan', LastName: 'Tee'});
			}
			// You can't delete employees
			catch (e) {
				// Do Nothing
			}

			result = await xero.employees.get();
		});

		it('the response is defined', () => {
			expect(result).not.toBeNull();
		});

		it('employee created can be fetched', async () => {
			expect(result.Employees.find((emp) => emp.FirstName == 'Bryan')).toMatchObject({
				FirstName: 'Bryan',
				LastName: 'Tee'
			});
		});
	});

});
