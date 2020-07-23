import { ItemModel } from '../http-server/v1/models/Invoice/ItemModel';

export interface InvoiceDataItemInterface extends Omit<ItemModel, 'unitPrice' | 'quantity'> {
  quantity: string;
  unitPrice: string;
  tax: string;
  netto: string;
  brutto: string;
}
