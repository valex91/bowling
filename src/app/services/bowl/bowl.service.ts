import { IBowl } from './bowl.interface';

export class Bowl implements IBowl {
  public knockedDownPins: number;

  constructor(knockedDownPins: number) {
    this.knockedDownPins = knockedDownPins;
  }
}
