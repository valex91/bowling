import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BowlingGame } from '../../services/bowling-game/bowling.game';
import { IScoreboardComponent } from './scoreboard.component.interface';

@Component({
  selector: 'bowling-scoreboard',
  template: ''
})
export class ScoreboardComponentStub implements IScoreboardComponent {
  @Input()
  public bowlingGame: BowlingGame;

  @Output()
  public bowlinGameRequestNewGame: EventEmitter<void> = new EventEmitter<void>();
}
