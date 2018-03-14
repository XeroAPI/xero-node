import { EmployeesResponse } from '../AccountingAPI-types';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig } from './helpers/integration.helpers';

const data = getPrivateConfig();
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
			expect.assertions(1);
			for (const emp of result.Employees) {
				if (emp.FirstName == 'Bryan' && emp.LastName == 'Tee') {
					expect(emp).toMatchObject({
						FirstName: 'Bryan',
						LastName: 'Tee'
					});
					break;
				}
			}
		});
	});

});
