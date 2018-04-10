import { EmployeesResponse } from '../AccountingAPI-responses';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { getOrCreateEmployeeId } from './helpers/entityId.helpers';
import { Employee } from '../AccountingAPI-models';

describe('/employees', () => {

	let xero: AccountingAPIClient;

	let employeeIdsToArchive: string[] = [];

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('create single', async () => {
		const response = await xero.employees.create({
			FirstName: 'Bryan',
			LastName: 'Tee' + Date.now()
		});

		collectEmployeesToArchive(response);

		expect(response.Employees.length).toBe(1);
		expect(response.Employees[0].FirstName).toEqual('Bryan');
	});

	it('get single', async () => {
		const response = await xero.employees.get({ EmployeeID: await getOrCreateEmployeeId(xero) });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Employees.length).toBe(1);
		expect(response.Employees[0].EmployeeID).toBeTruthy();
	});

	it('get all', async () => {
		const response = await xero.employees.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Employees.length).toBeGreaterThan(0);
		expect(response.Employees[0].EmployeeID).toBeTruthy();
	});

	// skip: looks like archiving an employee doesn't work through the API, this test always fails
	it.skip('update', async () => {
		const response = await xero.employees.update({
			EmployeeID: await getOrCreateEmployeeId(xero),
			Status: 'ARCHIVED'
		});

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Employees.length).toBe(1);
		expect(response.Employees[0].EmployeeID).toBeTruthy();
		expect(response.Employees[0].Status).toEqual('ARCHIVED');
	});

	afterAll(async () => {
		const employeeToUpdate: Employee[] = employeeIdsToArchive.map((employeeId) => ({
			EmployeeID: employeeId,
			Status: 'ARCHIVED'
		}));

		await xero.employees.update({
			Employees: employeeToUpdate
		});
	});

	function collectEmployeesToArchive(response: EmployeesResponse) {
		employeeIdsToArchive = employeeIdsToArchive.concat(response.Employees.map((employee) => employee.EmployeeID));
	}
});
