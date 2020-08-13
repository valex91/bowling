import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BowlingGameFactoryService } from '../../services/bowling-game-factory/bowling-game-factory.service';
import { BowlingGameFactoryServiceStub } from '../../services/bowling-game-factory/bowling-game-factory.service.stub';
import { ScoreboardComponentStub } from '../scoreboard/scoreboard.component.stub';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent,
    dependencies: { gameFactory: BowlingGameFactoryServiceStub },
    fixture: ComponentFixture<GameComponent>;

  function getScoreboard(): DebugElement {
    return fixture.debugElement.query(By.directive(ScoreboardComponentStub));
  }

  beforeEach(async(() => {
    dependencies = { gameFactory: new BowlingGameFactoryServiceStub() };
    (dependencies.gameFactory.create as jasmine.Spy).and.returnValue('game');
    TestBed.configureTestingModule({
      declarations: [GameComponent, ScoreboardComponentStub],
      providers: [
        {
          provide: BowlingGameFactoryService,
          useValue: dependencies.gameFactory
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when playing a game', () => {
    beforeEach(() => {
      fixture.debugElement.query(By.css('button')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
    });

    it('should request an instance of the game', () => {
      expect(dependencies.gameFactory.create).toHaveBeenCalledWith();
    });

    describe('when there is a game', () => {
      it('should pass the detail of the game to the scoreboard', () => {
        expect(getScoreboard().componentInstance.bowlingGame).toBe('game');
      });

      it('should no longer display the button', () => {
        expect(fixture.debugElement.query(By.css('button'))).toBeFalsy();
      });
    });
  });
});
