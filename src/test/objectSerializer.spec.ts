import { ObjectSerializer } from '../gen/model/accounting/models';

describe('ObjectSerializer', () => {
  it('preserves invoice date fields as strings during deserialization', () => {
    const invoice = ObjectSerializer.deserialize(
      {
        Date: '/Date(1743638400000+0000)/',
        DueDate: '/Date(1743724800000+0000)/',
      },
      'Invoice',
    );

    expect(invoice.date).toBe('/Date(1743638400000+0000)/');
    expect(invoice.dueDate).toBe('/Date(1743724800000+0000)/');
  });
});
