import { Controller, Post, BodyParams } from '@tsed/common';
import PDF from '../../pdf-generator';
import { DataModel } from './models/Invoice/DataModel';

@Controller('/invoice')
export class Invoice {
  @Post()
  async generate(@BodyParams() payload: DataModel): Promise<string> {
    return await new PDF()
      .data(payload)
      .generate();
  }
}
