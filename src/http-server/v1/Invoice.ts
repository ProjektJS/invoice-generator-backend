import { Controller, Post, Required, MinLength, BodyParams, ContentType } from '@tsed/common';
import pdfPrinter from '../../pdf-generator';

class BodyParamsModel {
  // @Required()
  // @MinLength(1)
  // name: string;
}

@Controller('/invoice')
export class Invoice {
  @Post()
  @ContentType('application/pdf')
  async generate(@BodyParams() payload: BodyParamsModel): Promise<string> {
    return await pdfPrinter();
  }
}
