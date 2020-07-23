// @ts-ignore
import * as PDFPrinter from 'pdfmake';
import * as path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

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

export default class Generator<T> {
  private template!: (data: T) => TDocumentDefinitions;
  private data!: T;

  setData(data: T): Generator<T> {
    this.data = data;
    return this;
  }

  setTemplate(template: (data: T) => TDocumentDefinitions): Generator<T> {
    this.template = template;
    return this;
  }

  generate(): Promise<string> {
    return new Promise((resolve) => {
      this.getBuffer(resolve);
    });
  }

  private getBuffer(resolve: (value: string) => void) {
    let result;
    const chunks: any[] = [];
    const doc = printer.createPdfKitDocument(this.template(this.data));
    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    doc.on('end', () => {
      result = Buffer.concat(chunks);
      resolve(result.toString('base64'));
    });
    doc.end();
  }
}