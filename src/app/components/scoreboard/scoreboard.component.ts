import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BowlingGame } from '../../services/bowling-game/bowling.game';
import { Frame } from '../../services/frame/frame';
import { IScoreboardComponent } from './scoreboard.component.interface';

@Component({
  selector: 'bowling-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements IScoreboardComponent {
  @Input()
  public bowlingGame: BowlingGame;

  @Output()
  public bowlinGameRequestNewGame: EventEmitter<void> = new EventEmitter<void>();

  public selected: Frame;

  public requestNewGame(): void {
    this.bowlinGameRequestNewGame.emit();
    this.selected = null;
  }

  public totalForGame(): number {
    return this.bowlingGame.frames.slice(0, 10).reduce((acum: number, current: Frame): number => {
      acum += current.total;
      return acum;
    }, 0);
  }

  public selectedFrame(frame: Frame): void {
    this.selected = frame;
  }
}
