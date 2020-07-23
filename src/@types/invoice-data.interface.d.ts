import { DataModel } from '../http-server/v1/models/Invoice/DataModel';
import { InvoiceDataItemInterface } from './invoice-data-item.interface';

export interface InvoiceDataInterface extends Omit<DataModel, 'items'> {
  summary: {
    netto: string;
    brutto: string;
    tax: string;
  };
  items: InvoiceDataItemInterface[];
}
