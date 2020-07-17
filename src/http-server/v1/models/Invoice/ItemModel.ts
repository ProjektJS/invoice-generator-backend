import { Required } from '@tsed/common';

export class ItemModel {
  @Required()
  name: string;

  @Required()
  quantity: number;

  @Required()
  unitPrice: number;

  @Required()
  VAT: number;
}