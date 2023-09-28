import {PayrollUkApi} from '../payrollUKApi';
import {restoreAndMockEmptyResponse} from "../../../test/utils/mockRequest";
import {Benefit} from "../../model/payroll-uk/benefit";

jest.mock('request');

const localVarRequest = require('request');
const payRollUkAPI = new PayrollUkApi();

const testBenefit = {
    "name": "test benefit",
    "category": Benefit.CategoryEnum.Other,
    "liabilityAccountId": "test-liabilityAccountId",
    "expenseAccountId": "test-expenseAccountId",
    "percentage": 10,
    "calculationType": Benefit.CalculationTypeEnum.FixedAmount,
};
describe('gen.api.payRollUkApi', () => {
    describe('createBenefit function', () => {
        it('header will contain Idempotency-Key if call this with idempotencyKey params', async () => {
            restoreAndMockEmptyResponse(localVarRequest);
            await payRollUkAPI.createBenefit('test-xeroTenantId', testBenefit, 'test-idempotencyKey');
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(true);
        });
        it('header will not contain Idempotency-Key if call this without idempotencyKey params', async () => {
            restoreAndMockEmptyResponse(localVarRequest);
            await payRollUkAPI.createBenefit('test-xeroTenantId', testBenefit, null);
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(false);
        });
    });

});
