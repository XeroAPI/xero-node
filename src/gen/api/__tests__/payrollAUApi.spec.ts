import {PayrollAuApi} from '../payrollAUApi';

jest.mock('request');

const localVarRequest = require('request');
const payRollAuAPI = new PayrollAuApi();

const testEmployee = [{
    "firstName": "Nick",
    "lastName": "Fury",
    "dateOfBirth": new Date(321523200000).toISOString(),
    "externalLink": {"Url": "http://twitter.com/#!/search/Nick+Fury"}
}]
describe('gen.api.payrollAUApi', () => {
    describe('approveLeaveApplication function', () => {
        it('header will contain Idempotency-Key if call this with idempotencyKey params', async () => {
            localVarRequest.mockRestore();
            localVarRequest.mockImplementation((args, callback) => {
                callback(null, {statusCode: 200}, {data: 'mock return data'});
            });
            await payRollAuAPI.approveLeaveApplication('test-xeroTenantId', 'test-leaveApplicationID', 'test-idempotencyKey');
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(true);
        });
        it('header will not contain Idempotency-Key if call this without idempotencyKey params', async () => {
            localVarRequest.mockRestore();
            localVarRequest.mockImplementation((args, callback) => {
                callback(null, {statusCode: 200}, {data: 'mock return data'});
            });
            await payRollAuAPI.approveLeaveApplication('test-xeroTenantId', 'test-leaveApplicationID', null);
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(false);
        });
    });

    describe('createEmployee function', () => {
        it('header will contain Idempotency-Key if call this with idempotencyKey params', async () => {
            localVarRequest.mockRestore();
            localVarRequest.mockImplementation((args, callback) => {
                callback(null, {statusCode: 200}, {data: 'mock return data'});
            });
            await payRollAuAPI.createEmployee('test-xeroTenantId', testEmployee, 'test-idempotencyKey');
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(true);
        });
        it('header will not contain Idempotency-Key if call this without idempotencyKey params', async () => {
            localVarRequest.mockRestore();
            localVarRequest.mockImplementation((args, callback) => {
                callback(null, {statusCode: 200}, {data: 'mock return data'});
            });
            await payRollAuAPI.createEmployee('test-xeroTenantId', testEmployee, null);
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(false);
        });
    });
});
