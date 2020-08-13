import { Injectable } from '@angular/core';
import { BowlingGame } from '../bowling-game/bowling.game';
import { FrameFactoryService } from '../frame-factory/frame-factory.service';
import { IBowlingGame } from './bowling-game-factory.interface';

@Injectable({
  providedIn: 'root'
})
export class BowlingGameFactoryService implements IBowlingGame {
  private readonly _frameFactory: FrameFactoryService;

  constructor(frameFactory: FrameFactoryService) {
    this._frameFactory = frameFactory;
  }

  public create(): BowlingGame {
    return new BowlingGame(this._frameFactory);
  }
}
