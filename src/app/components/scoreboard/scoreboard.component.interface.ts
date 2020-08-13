import { EventEmitter } from '@angular/core';
import { BowlingGame } from '../../services/bowling-game/bowling.game';

export interface IScoreboardComponent {
  bowlingGame: BowlingGame;
  bowlinGameRequestNewGame: EventEmitter<void>;
}
