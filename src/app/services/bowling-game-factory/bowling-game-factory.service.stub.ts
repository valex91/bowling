import { Injectable } from '@angular/core';
import { BowlingGame } from '../bowling-game/bowling.game';
import { IBowlingGame } from './bowling-game-factory.interface';

@Injectable()
export class BowlingGameFactoryServiceStub implements IBowlingGame {
  public create: () => BowlingGame = jasmine.createSpy('bowlingGameFactory.create');
}
