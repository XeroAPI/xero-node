import { ObjectSerializer } from '../models';


describe('gen.api.accountingApi', () => {
	describe('ObjectSerializer serialize function', () => {
		it('will return data it self if data is null or undefined', () => {
			expect(ObjectSerializer.serialize(undefined, 'string')).toBe(undefined);
			expect(ObjectSerializer.serialize(null, 'string')).toBe(null);
		});
	});
});
