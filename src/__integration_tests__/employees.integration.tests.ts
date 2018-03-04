import { EmployeesResponse } from '../AccountingAPI-types';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getConfig } from './helpers/integration.helpers';

const data = getConfig();
const xero = new AccountingAPIClient(data);

describe('/employees', () => {
	describe('and creating then getting', () => {
		let result: EmployeesResponse;

		beforeAll(async () => {
			try {
				await xero.employees.create({ FirstName: 'Bryan', LastName: 'Tee' });
			}
			// You can't delete employees
			catch (e) {
				// Do Nothing
			}

			result = await xero.employees.get();
		});

		it('there is an employee with expected name', async () => {
			expect(result.Employees.find((emp) => (emp.FirstName == 'Bryan' && emp.LastName == 'Tee'))).toMatchObject({
				FirstName: 'Bryan',
				LastName: 'Tee'
			});
		});
	});

});
