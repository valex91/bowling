import { AMOUNT_OF_PINS } from '../../constants/amount-of-pins.constant';
import { Bowl } from '../bowl/bowl.service';
import { PinActionService } from '../pin-action/pin-action.service';
import { FrameStatus, IFrame } from './fram.interface';

export class Frame implements IFrame {
  public status: FrameStatus;

  private _bowls: Array<Bowl> = [];

  private _bonusBowls: Array<Bowl> = [];

  private _pinAction: PinActionService;

  constructor(pinAction: PinActionService) {
    this._pinAction = pinAction;
  }

  public get isCompleted(): boolean {
    return this._bowls.length === 2 || this.status === FrameStatus.Strike;
  }

  public get points(): Array<number> {
    return this._bowls.map((bowl: Bowl) => {
      return bowl.knockedDownPins;
    });
  }

  public get total(): number {
    return Frame._getTotalFromBowls(this._bowls) + Frame._getTotalFromBowls(this._bonusBowls);
  }

  private static _getTotalFromBowls(bowls: Array<Bowl>): number {
    return bowls.reduce((total: number, current: Bowl) => {
      total += current.knockedDownPins;

      return total;
    }, 0);
  }

  public play(): Bowl {
    let throwedBowl: Bowl;
    if (!this._bowls.length) {
      const knockedDownPins: number = this._pinAction.throwBall();

      if (knockedDownPins === AMOUNT_OF_PINS) {
        this.status = FrameStatus.Strike;
      }
      throwedBowl = new Bowl(knockedDownPins);

      this._bowls.push(throwedBowl);
    } else {
      const previousAttempt: Bowl = this._bowls[this._bowls.length - 1],
        leftoverPins: number = AMOUNT_OF_PINS - previousAttempt.knockedDownPins,
        currentTryKnockdownPins: number =  this._pinAction.throwBall(leftoverPins);

      if ((previousAttempt.knockedDownPins + currentTryKnockdownPins) === AMOUNT_OF_PINS) {
        this.status = FrameStatus.Spare;
      } else {
        this.status = FrameStatus.Default;
      }
      throwedBowl = new Bowl(currentTryKnockdownPins);
      this._bowls.push(throwedBowl);
    }

    return throwedBowl;
  }

  public addBowl(bowl: Bowl): void {
    if (this.status === FrameStatus.Spare || this.status === FrameStatus.Strike) {
      if (this.status === FrameStatus.Spare && this._bonusBowls.length === 0) {
        this._bonusBowls.push(bowl);
      }

      if (this.status === FrameStatus.Strike && this._bonusBowls.length < 2) {
        this._bonusBowls.push(bowl);
      }
    }
  }
}
