import { Controller, Post, BodyParams } from '@tsed/common';
import PDF from '../../pdf-generator';
import { DataModel } from './models/Invoice/DataModel';
import { DataAdapter } from './services/Invoice/DataAdapter';
import { InvoiceDataInterface } from '../../@types/invoice-data.interface';
import template from './services/Invoice/template';

@Controller('/invoice')
export class Invoice {
  @Post()
  async generate(@BodyParams() payload: DataModel): Promise<string> {
    const data = DataAdapter.adapt(payload);
    return await new PDF<InvoiceDataInterface>()
      .setData(data)
      .setTemplate(template)
      .generate();
  }
}
