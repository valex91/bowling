import { Injectable } from '@angular/core';
import { Frame } from '../frame/frame';
import { PinActionService } from '../pin-action/pin-action.service';
import { IFrameFactory } from './frame-factory.interface';

@Injectable({
  providedIn: 'root'
})
export class FrameFactoryService implements IFrameFactory {
  private readonly _pinAction: PinActionService;

  constructor(pinAction: PinActionService) {
    this._pinAction = pinAction;
  }

  public create(): Frame {
    return new Frame(this._pinAction);
  }
}
