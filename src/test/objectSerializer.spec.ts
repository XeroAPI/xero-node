import { ObjectSerializer } from "../gen/model/accounting/models";

describe("accounting ObjectSerializer", () => {
  it("deserializes Id-suffixed tracking option keys from invoice line items", () => {
    const invoices = ObjectSerializer.deserialize(
      {
        Invoices: [
          {
            InvoiceID: "invoice-1",
            LineItems: [
              {
                Tracking: [
                  {
                    TrackingCategoryID: "category-1",
                    TrackingOptionId: "option-1",
                    Name: "Region",
                    Option: "North",
                  },
                ],
              },
            ],
          },
        ],
      },
      "Invoices",
    );

    expect(invoices.invoices?.[0].lineItems?.[0].tracking?.[0].trackingOptionID).toBe(
      "option-1",
    );
  });
});
