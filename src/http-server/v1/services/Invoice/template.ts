import { InvoiceDataInterface } from '../../../../@types/invoice-data.interface';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export default function template(data: InvoiceDataInterface): TDocumentDefinitions {
  return {
    content: [
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: data.seller.name, style: 'sellerName' },
              { text: data.seller.street, style: 'sellerData' },
              {
                text: `${data.seller.postalCode} ${data.seller.city}`,
                style: 'sellerData',
              },
              {
                text: `NIP: ${data.seller.nip}`,
                style: 'sellerData',
              },
            ],
          },
          {
            width: '30%',
            stack: [
              { text: 'Faktura VAT', style: 'invoiceHeader' },
              {
                columns: [
                  {
                    width: '*',
                    stack: [
                      { text: 'Numer:', style: 'invoiceMeta' },
                      { text: 'Data wystawienia:', style: 'invoiceMeta' },
                      { text: 'Data sprzedaży:', style: 'invoiceMeta' },
                    ],
                  },
                  {
                    width: 60,
                    stack: [
                      { text: data.number, style: 'invoiceMeta' },
                      { text: data.createDate, style: 'invoiceMeta' },
                      { text: data.sellDate, style: 'invoiceMeta' },
                    ],
                  }
                ],
                columnGap: 2,
              },
            ],
          },
        ],
        columnGap: 10,
        margin: [0, 0, 0, 35],
      },
      {
        stack: [
          { text: 'Wystawione dla:                                        ', fontSize: 8, decoration: 'underline' },
          { text: data.client.name, style: 'clientName' },
          { text: data.client.street, style: 'clientData' },
          {
            text: `${data.client.postalCode} ${data.client.city}`,
            style: 'clientData',
          },
          {
            text: `NIP: ${data.client.nip}`,
            style: 'clientData',
          },
        ],
        margin: [ 0, 0 , 0, 15],
      },
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
      invoiceHeader: {
        fontSize: 18,
        bold: true,
        alignment: 'right',
        margin: [0, 0, 0, 5],
      },
      invoiceMeta: {
        fontSize: 8,
        alignment: 'right',
        margin: [0, 0, 0, 2],
      },
      sellerName: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 5],
      },
      sellerData: {
        fontSize: 10,
        margin: [0, 0, 0, 2],
      },
      clientName: {
        fontSize: 10,
        bold: true,
        margin: [0, 0, 0, 2],
      },
      clientData: {
        fontSize: 8,
        margin: [0, 0, 0, 2],
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
