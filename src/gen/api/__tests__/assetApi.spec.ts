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
});
