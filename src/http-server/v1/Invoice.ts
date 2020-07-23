import { Controller, Post, BodyParams } from '@tsed/common';
import PDF from '../../pdf-generator';
import { DataModel } from './models/Invoice/DataModel';
import { DataAdapter } from './services/Invoice/DataAdapter';

@Controller('/invoice')
export class Invoice {
  @Post()
  async generate(@BodyParams() payload: DataModel): Promise<string> {
    return await new PDF()
      .data(DataAdapter.adapt(payload))
      .generate();
  }
}
