import Generator from './generator';

export default class PDF {
  data(data: any): Generator {
    return new Generator(data);
  }
}
