import { Required, MinItems, Format, PropertyType } from '@tsed/common';
import { PartyModel } from './PartyModel';
import { ItemModel } from './ItemModel';

export class DataModel {
  @Required()
  seller: PartyModel;

  @Required()
  @Format('date')
  sellDate: Date;

  @Required()
  createPlace: string;

  @Required()
  @Format('date')
  createDate: string;

  @Required()
  number: string;

  @Required()
  client: PartyModel;

  @Required()
  @MinItems(1)
  @PropertyType(ItemModel)
  items: ItemModel[];
}
