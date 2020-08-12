import { Injectable } from '@angular/core';
import { AMOUNT_OF_PINS } from '../../constants/amount-of-pins.constant';

@Injectable({
  providedIn: 'root'
})
export class PinActionService {
  public throwBall(leftovers: number = AMOUNT_OF_PINS): number {
    return Math.floor(Math.random() * (leftovers + 1));
  }
}
