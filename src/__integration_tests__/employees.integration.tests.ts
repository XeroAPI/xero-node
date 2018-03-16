import { EmployeesResponse } from '../AccountingAPI-types';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('Employees endpoint', () => {

	let xero: AccountingAPIClient;

	let employeeIdsToArchive: string[] = [];

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	// need to work out how to delete/archive employees so we can create unique contacts and clean up
	it.skip('create single', async () => {
		const response = await xero.employees.create({
			FirstName: 'Bryan',
			LastName: 'Tee'
		});

		collectEmployeesToArchive(response);

		expect(response.Employees.length).toBe(1);
		expect(response.Employees[0].FirstName).toEqual('Bryan');
	});

	it('get all', async () => {
		const response = await xero.employees.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Employees.length).toBeGreaterThanOrEqual(1);
		expect(response.Employees[0].EmployeeID).toBeTruthy();
	});

	// looks like archiving an employee doesn't work through the API
	it.skip('update', async () => {
		const response = await xero.employees.updateMultiple({
			Employees: [
				{
					FirstName: 'Bryan',
					LastName: 'Tee',
					Status: 'ARCHIVED'
				}
			]
		});

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Employees.length).toBe(1);
		expect(response.Employees[0].EmployeeID).toBeTruthy();
		expect(response.Employees[0].Status).toEqual('ARCHIVED');
	});

	afterAll(async () => {
		await xero.employees.updateMultiple({
			Employees: employeeIdsToArchive.map((employeeId) => ({
				EmployeeID: employeeId,
				Status: 'ARCHIVED'
			}))
		});
	});

	function collectEmployeesToArchive(response: EmployeesResponse) {
		employeeIdsToArchive = employeeIdsToArchive.concat(response.Employees.map((employee) => employee.EmployeeID));
	}
});
