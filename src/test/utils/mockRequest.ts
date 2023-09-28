export const restoreAndMockEmptyResponse = (localVarRequest) => {
    localVarRequest.mockRestore();
    localVarRequest.mockImplementation((args, callback) => {
        callback(null, {statusCode: 200}, {data: 'mock return data'});
    });
}