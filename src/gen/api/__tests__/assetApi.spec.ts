import {AssetApi} from '../assetApi';
import {AssetStatus} from "../../model/assets/assetStatus";
import {BookDepreciationSetting} from "../../model/assets/bookDepreciationSetting";
import {restoreAndMockEmptyResponse} from "../../../test/utils/mockRequest";

jest.mock('request');

const localVarRequest = require('request');
const assetAPI = new AssetApi();

const testAsset = {
    "assetName": "Computer74863",
    "assetNumber": "123477544",
    "purchaseDate": "2020-01-01",
    "purchasePrice": 100,
    "disposalPrice": 23.23,
    "assetStatus": AssetStatus.Draft,
    "bookDepreciationSetting": {
        "depreciationMethod": BookDepreciationSetting.DepreciationMethodEnum.StraightLine,
        "averagingMethod": BookDepreciationSetting.AveragingMethodEnum.ActualDays,
        "depreciationRate": 0.5,
        "depreciationCalculationMethod": BookDepreciationSetting.DepreciationCalculationMethodEnum.None,
    },
    "bookDepreciationDetail": {
        "currentCapitalGain": 5.32,
        "currentGainLoss": 3.88,
        "depreciationStartDate": "2020-01-02",
        "costLimit": 100,
        "currentAccumDepreciationAmount": 2.25
    },
    "AccountingBookValue": 99.5
};
const testAssetType = {
    "assetTypeName": "Machinery11004",
    "fixedAssetAccountId": "3d8d063a-c148-4bb8-8b3c-a5e2ad3b1e82",
    "depreciationExpenseAccountId": "d1602f69-f900-4616-8d34-90af393fa368",
    "accumulatedDepreciationAccountId": "9195cadd-8645-41e6-9f67-7bcd421defe8",
    "bookDepreciationSetting": {
        "depreciationMethod": BookDepreciationSetting.DepreciationMethodEnum.DiminishingValue100,
        "averagingMethod": BookDepreciationSetting.AveragingMethodEnum.ActualDays,
        "depreciationRate": 0.05,
        "depreciationCalculationMethod": BookDepreciationSetting.DepreciationCalculationMethodEnum.None,
    }
}
describe('gen.api.assetApi', () => {
    describe('createAsset function', () => {
        it('header will contain Idempotency-Key if call this with idempotencyKey params', async () => {
            restoreAndMockEmptyResponse(localVarRequest);
            await assetAPI.createAsset('test-xeroTenantId', testAsset, 'test-idempotencyKey');
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(true);
        });
        it('header will not contain Idempotency-Key if call this without idempotencyKey params', async () => {
            restoreAndMockEmptyResponse(localVarRequest);
            await assetAPI.createAsset('test-xeroTenantId', testAsset, null);
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(false);
        });
    });
    describe('createAssetType function', () => {
        it('header will contain Idempotency-Key if call this with idempotencyKey params', async () => {
            restoreAndMockEmptyResponse(localVarRequest);
            await assetAPI.createAssetType('test-xeroTenantId', 'test-idempotencyKey', testAssetType);
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(true);
        });
        it('header will not contain Idempotency-Key if call this without idempotencyKey params', async () => {
            restoreAndMockEmptyResponse(localVarRequest);
            await assetAPI.createAssetType('test-xeroTenantId', null, testAssetType);
            expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(false);
        });
    });
});
