import { InvoiceDataInterface } from '../../../../@types/invoice-data.interface';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export default function template(data: InvoiceDataInterface): TDocumentDefinitions {
  return {
    content: [
      { text: 'Faktura VAT', style: 'header' },
      { text: data.number, style: 'subHeader', margin: [0, 3, 0, 20] },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'LP', style: ['defaultStyle', 'tableHeader'], alignment: 'center' },
              { text: 'NAZWA', style: ['defaultStyle', 'tableHeader'] },
              { text: 'ILOŚĆ', style: ['defaultStyle', 'tableHeader'], alignment: 'center' },
              { text: 'CJ', style: ['defaultStyle', 'tableHeader'], alignment: 'center' },
              { text: 'VAT', style: ['defaultStyle', 'tableHeader'], alignment: 'center' },
              { text: 'NETTO', style: ['defaultStyle', 'tableHeader'], alignment: 'center' },
              { stack: [ 'WARTOŚĆ', 'PODATKU' ], style: ['defaultStyle', 'tableHeader'], alignment: 'center' },
              { text: 'BRUTTO', style: ['defaultStyle', 'tableHeader'], alignment: 'center' },
            ],
            ...data.items.map((item, index) => [
              { text: index + 1, style: 'defaultStyle', alignment: 'center' },
              { text: item.name, style: 'defaultStyle' },
              { text: item.quantity, style: 'defaultStyle', alignment: 'center'  },
              { text: item.unitPrice, style: 'currency' },
              { text: `${item.VAT}%`, style: 'defaultStyle', alignment: 'center' },
              { text: item.netto, style: 'currency' },
              { text: item.tax, style: 'currency' },
              { text: item.brutto, style: 'currency' },
            ]),
            [
              {
                text: 'Razem w PLN',
                colSpan: 5,
                border: [false, false, false, false],
                style: 'defaultStyle',
                bold: true,
                alignment: 'right',
              },
              {},
              {},
              {},
              {},
              { text: data.summary.netto, style: 'currency', fillColor: '#eee' },
              { text: data.summary.tax, style: 'currency', fillColor: '#eee' },
              { text: data.summary.brutto, style: 'currency', fillColor: '#eee' },
            ],
          ]
        }
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        alignment: 'center',
        bold: true
      },
      subHeader: {
        fontSize: 13,
        alignment: 'center',
        italics: true,
      },
      currency: {
        font: 'Monaco',
        fontSize: 7,
        alignment: 'center',
      },
      tableHeader: {
        bold: true,
        fillColor: '#e0e0e0',
      },
      defaultStyle: {
        fontSize: 8,
      },
    }
  };
}
