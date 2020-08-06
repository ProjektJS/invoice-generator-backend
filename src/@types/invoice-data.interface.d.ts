import { DataModel } from '../http-server/v1/models/Invoice/DataModel';
import { InvoiceDataItemInterface } from './invoice-data-item.interface';
import { InvoiceDataTaxesInterface } from './invoice-data-taxes.interface';

export interface InvoiceDataInterface extends Omit<DataModel, 'items' | 'sellDate' | 'createDate'> {
  createDate: string;
  sellDate: string;
  summary: {
    netto: string;
    brutto: string;
    tax: string;
  };
  taxes: InvoiceDataTaxesInterface[];
  items: InvoiceDataItemInterface[];
}
