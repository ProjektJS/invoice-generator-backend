// @ts-ignore
import * as PDFPrinter from 'pdfmake';
import * as path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { InvoiceDataInterface } from '../@types/invoice-data.interface';

const fonts = {
  Roboto: {
    normal: path.resolve(__dirname, '..', '..', 'resources', 'fonts', 'Roboto-Regular.ttf'),
    bold: path.resolve(__dirname, '..', '..', 'resources', 'fonts', 'Roboto-Medium.ttf'),
    italics: path.resolve(__dirname, '..', '..', 'resources', 'fonts', 'Roboto-Italic.ttf'),
    bolditalics: path.resolve(__dirname, '..', '..', 'resources', 'fonts', 'Roboto-MediumItalic.ttf')
  },
  Monaco: {
    normal: path.resolve(__dirname, '..', '..', 'resources', 'fonts', 'monaco.ttf'),
  }
};
const printer = new PDFPrinter(fonts);

export default class Generator {
  private definition: TDocumentDefinitions = {
    content: [],
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

  constructor(private data: InvoiceDataInterface) {
    this.prepareContent();
  }

  generate(): Promise<string> {
    return new Promise((resolve) => {
      this.getBuffer(resolve);
    });
  }

  private getBuffer(resolve: (value: string) => void) {
    let result;
    const chunks: any[] = [];
    const doc = printer.createPdfKitDocument(this.definition);
    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    doc.on('end', () => {
      result = Buffer.concat(chunks);
      resolve(result.toString('base64'));
    });
    doc.end();
  }

  private prepareContent() {
    this.definition.content = [
      { text: 'Faktura VAT', style: 'header' },
      { text: this.data.number, style: 'subHeader', margin: [0, 3, 0, 20] },
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
            ...this.data.items.map((item, index) => [
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
              { text: this.data.summary.netto, style: 'currency', fillColor: '#eee' },
              { text: this.data.summary.tax, style: 'currency', fillColor: '#eee' },
              { text: this.data.summary.brutto, style: 'currency', fillColor: '#eee' },
            ],
          ]
        }
      },
    ];
  }
}