import { BowlingGame } from '../bowling-game/bowling.game';

export interface IBowlingGame {
  create(): BowlingGame;
}
