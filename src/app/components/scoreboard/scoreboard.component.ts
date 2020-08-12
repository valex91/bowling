import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BowlingGame } from '../../services/bowling-game/bowling.game';

@Component({
  selector: 'bowling-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  @Input()
  public bowlingGame: BowlingGame;

  @Output()
  public bowlinGameRequestNewGame: EventEmitter<void> = new EventEmitter<void>();

  public requestNewGame(): void {
    this.bowlinGameRequestNewGame.emit();
  }
}
