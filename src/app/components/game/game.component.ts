import { Component } from '@angular/core';
import { BowlingGameFactoryService } from '../../services/bowling-game-factory/bowling-game-factory.service';
import { BowlingGame } from '../../services/bowling-game/bowling.game';

@Component({
  selector: 'bowling-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  public game: BowlingGame;

  private _gameFactory: BowlingGameFactoryService;

  constructor(gameFactory: BowlingGameFactoryService) {
    this._gameFactory = gameFactory;
  }

  public newGame(): void {
    this.game = this._gameFactory.create();
  }
}
