import { AccountingAPIClient } from '../../endpoints/AccountingAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { EmployeesResponse } from '../../interfaces/AccountingResponse';

const privateKeyFile = path.resolve(__dirname, '..', '..', '..', 'privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

// TODO: Let them pass in the privateKey and privateKey path

const data = require('./xero.json');
const xero = new AccountingAPIClient({ ...data, ...{ PrivateKeyCert: privateKey } });

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
