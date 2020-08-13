import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BowlingGameStub } from '../../services/bowling-game/bowling-game.stub';
import { FrameStub } from '../../services/frame/frame.service.stub';
import { FrameComponentStub } from '../frame/frame.component.stub';
import { PinsComponentStub } from '../pins/pins.component.stub';

import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  function getButtons(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.css('button'));
  }

  @Component({
    template: `
      <bowling-scoreboard
        (bowlinGameRequestNewGame)="onNewGame()"
        [bowlingGame]="game"></bowling-scoreboard>`
  })
  class TestHost {
    public game: BowlingGameStub = new BowlingGameStub();

    public onNewGame: jasmine.Spy = jasmine.createSpy('onNewGame');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHost,
        ScoreboardComponent,
        FrameComponentStub,
        PinsComponentStub
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHost);
  });

  describe('when watching the score of a game', () => {
    beforeEach(() => {
      fixture.componentInstance.game.frames = Array.from({ length: 11 }, () => new FrameStub());
      fixture.componentInstance.game.frames.forEach((frame: FrameStub) => frame.total = 10);
    });
    describe('when the game is still going', () => {
      beforeEach(() => {
        (fixture.componentInstance.game.isFinished as jasmine.Spy).and.returnValue(false);
        fixture.detectChanges();
      });

      it('should display only 10 frames', () => {
        expect(fixture.debugElement.queryAll(By.directive(FrameComponentStub)).length).toBe(10);
      });

      describe('when clicking on a frame', () => {
        let frames: Array<DebugElement>;
        beforeEach(() => {
          frames = fixture.debugElement.queryAll(By.directive(FrameComponentStub));
          frames[5].nativeElement.dispatchEvent(new Event('click'));
          fixture.detectChanges();
        });

        it('should display the details for that frame', () => {
          expect(fixture.debugElement.query(By.directive(PinsComponentStub)).componentInstance.bowlingPinsFrame).toBe(fixture.componentInstance.game.frames[5]);
        });
      });
    });

    describe('when the game is finished', () => {
      let buttons: Array<DebugElement>;
      beforeEach(() => {
        (fixture.componentInstance.game.isFinished as jasmine.Spy).and.returnValue(true);
        fixture.detectChanges();
        buttons = getButtons();
      });

      it('should prevent the player from throwing balls', () => {
        expect(buttons[0].properties.disabled).toBe(true);
      });

      it('should query if the player wants another game', () => {
        expect(buttons[1].nativeElement.textContent.trim()).toBe('another go');
      });

      describe('when generating a new game', () => {
        it('should clear the details for any frame', () => {
          expect(fixture.debugElement.query(By.directive(PinsComponentStub))).toBeNull();
        });
      });
    });
  });
});
