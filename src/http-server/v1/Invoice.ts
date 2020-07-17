import { Controller, Post, BodyParams, ContentType } from '@tsed/common';
import PDF from '../../pdf-generator';
import { DataModel } from './models/Invoice/DataModel';

@Controller('/invoice')
export class Invoice {
  @Post()
  @ContentType('application/pdf')
  async generate(@BodyParams() payload: DataModel): Promise<Buffer> {
    return await new PDF()
      .data(payload)
      .generate();
  }
}
