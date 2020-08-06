import { DataModel } from '../../models/Invoice/DataModel';
import { InvoiceDataInterface } from '../../../../@types/invoice-data.interface';
import * as numeral from 'numeral';
import * as moment from 'moment';
import { InvoiceDataTaxesInterface } from '../../../../@types/invoice-data-taxes.interface';
import { ItemModel } from '../../models/Invoice/ItemModel';

export class DataAdapter {
  static adapt(data: DataModel): InvoiceDataInterface {
    const summary = {
      netto: 0,
      brutto: 0,
      tax: 0,
    };
    return {
      ...data,
      sellDate: moment(data.sellDate).format('YYYY-MM-DD'),
      createDate: moment(data.createDate).format('YYYY-MM-DD'),
      items: data.items.map((item) => {
        const netto = item.quantity * item.unitPrice;
        const brutto = this.round(netto * (1 + (item.VAT / 100)));
        const tax = this.round(brutto - netto);

        summary.netto += netto;
        summary.brutto += brutto;
        summary.tax += tax;

        return {
          ...item,
          tax: numeral(tax).format('0,0.00'),
          quantity: numeral(item.quantity).format('0,0'),
          unitPrice: numeral(item.unitPrice).format('0,0.00'),
          netto: numeral(netto).format('0,0.00'),
          brutto: numeral(brutto).format('0,0.00'),
        };
      }),
      taxes: this.groupByTax(data.items),
      summary: {
        netto: numeral(summary.netto).format('0,0.00'),
        brutto: numeral(summary.brutto).format('0,0.00'),
        tax: numeral(summary.tax).format('0,0.00'),
      },
    };
  }

  private static groupByTax(items: ItemModel[]): InvoiceDataTaxesInterface[] {
    const taxes: { tax: number, brutto: number, netto: number, taxValue: number }[] = [];

    items.forEach((item) => {
      const netto = item.quantity * item.unitPrice;
      const brutto = this.round(netto * (1 + (item.VAT / 100)));
      const tax = this.round(brutto - netto);

      let taxObj = taxes.find((tax) => tax.tax === item.VAT);
      if (!taxObj) {
        taxObj = { tax: item.VAT, brutto: 0, netto: 0, taxValue: 0 };
        taxes.push(taxObj);
      }

      taxObj.netto += netto;
      taxObj.brutto += brutto;
      taxObj.taxValue += tax;
    });

    return taxes
      .map((tax) => ({
        tax: tax.tax,
        netto: numeral(tax.netto).format('0,0.00'),
        brutto: numeral(tax.brutto).format('0,0.00'),
        taxValue: numeral(tax.taxValue).format('0,0.00'),
      }))
      .sort((a, b) => (a.tax > b.tax) ? 1 : -1);
  }

  private static round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}