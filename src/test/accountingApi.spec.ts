jest.mock('axios', () => jest.fn());

import axios from 'axios';
import { AccountingApi } from '../gen/api/accountingApi';

describe('AccountingApi invoice attachment filenames', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (axios as unknown as jest.Mock).mockResolvedValue({
      status: 200,
      data: {},
    });
  });

  it('trims trailing spaces when creating an invoice attachment by filename', async () => {
    const api = new AccountingApi();

    await api.createInvoiceAttachmentByFileName(
      'tenant-123',
      'invoice-123',
      'invoice copy.pdf   ',
      Buffer.from('hello'),
    );

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.xero.com/api.xro/2.0/Invoices/invoice-123/Attachments/invoice%20copy.pdf',
      }),
    );
  });

  it('trims trailing spaces when updating an invoice attachment by filename', async () => {
    const api = new AccountingApi();

    await api.updateInvoiceAttachmentByFileName(
      'tenant-123',
      'invoice-123',
      'invoice copy.pdf   ',
      Buffer.from('hello'),
    );

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.xero.com/api.xro/2.0/Invoices/invoice-123/Attachments/invoice%20copy.pdf',
      }),
    );
  });
});
