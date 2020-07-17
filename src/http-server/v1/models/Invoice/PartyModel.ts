import { Pattern, Required } from '@tsed/common';

export class PartyModel {
  @Required()
  name: string;

  @Required()
  nip: string;

  @Required()
  street: string;

  @Required()
  city: string;

  @Required()
  @Pattern(/^\d{2}-\d{3}$/)
  postalCode: string;
}