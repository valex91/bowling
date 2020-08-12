import { BowlStub } from '../bowl/bowl.service.stub';
import { IFrameFactory } from '../frame-factory/frame-factory.interface';
import { FrameFactoryService } from '../frame-factory/frame-factory.service';
import { FrameFactoryStub } from '../frame-factory/frame-factory.sevice.stub';
import { FrameStatus } from '../frame/fram.interface';
import { Frame } from '../frame/frame';
import { FrameStub } from '../frame/frame.service.stub';

import { BowlingGame } from './bowling.game';

fdescribe('BowlingGameService', () => {
  let bowlingService: BowlingGame,
    frameStub: FrameStub,
    dependencies: {
      frameFactory: IFrameFactory
    };

  beforeEach(() => {
    dependencies = {
      frameFactory: new FrameFactoryStub()
    };

    frameStub = new FrameStub();
    (dependencies.frameFactory.create as jasmine.Spy).and.returnValue(frameStub);

    bowlingService = new BowlingGame(dependencies.frameFactory as unknown as FrameFactoryService);
  });

  describe('when throwing a ball', () => {
    describe('when there is no frame', () => {
      beforeEach(() => {
        frameStub.isCompleted = false;
        bowlingService.throwBall();
      });

      it('should create the frame', () => {
        expect((dependencies.frameFactory.create as jasmine.Spy).calls.count()).toBe(1);
      });

      describe('when there is an un-completed frame', () => {
        let bowlStub: BowlStub;
        beforeEach(() => {
          bowlStub = new BowlStub();
          bowlStub.knockedDownPins = 5;
          (frameStub.play as jasmine.Spy).and.returnValue(bowlStub);
          bowlingService.frames = [
            new FrameStub() as unknown as Frame,
            new FrameStub() as unknown as Frame
          ];
          bowlingService.throwBall();
        });

        it('should attempt to add the bowl to the 2 previous bowls', () => {
          expect(bowlingService.frames[0].addBowl).toHaveBeenCalledWith(bowlStub);
          expect(bowlingService.frames[1].addBowl).toHaveBeenCalledWith(bowlStub);
        });

        describe('when the frame get completed', () => {
          let newFrame: FrameStub;
          beforeEach(() => {
            newFrame = new FrameStub();
            frameStub.isCompleted = true;
            (dependencies.frameFactory.create as jasmine.Spy).and.returnValue(newFrame);
            bowlingService.throwBall();
          });

          it('should save the current frame and create a new one', () => {
            expect(bowlingService.frames[bowlingService.frames.length - 1]).toBe(frameStub as Frame);
            expect((dependencies.frameFactory.create as jasmine.Spy).calls.count()).toBe(2);
          });
        });
      });
    });

    describe('when the game is about to end', () => {
      let bowlStub: BowlStub;
      beforeEach(() => {
        bowlStub = new BowlStub();
        bowlStub.knockedDownPins = 5;
        (frameStub.play as jasmine.Spy).and.returnValue(bowlStub);
        bowlingService.frames = Array.from({ length: 10 }, () => {
          return new FrameStub() as unknown as Frame;
        });
      });

      describe('when the last frame is a normal frame', () => {
        beforeEach(() => {
          (dependencies.frameFactory.create as jasmine.Spy).calls.reset();
          bowlingService.frames[9].status = FrameStatus.Default;
          bowlingService.throwBall();
        });

        it('should not attempt to create the bonus frame', () => {
          expect((dependencies.frameFactory.create as jasmine.Spy).calls.count()).toBe(0);
        });
      });

      describe('when the last frame is a spare frame', () => {
        beforeEach(() => {
          (dependencies.frameFactory.create as jasmine.Spy).calls.reset();
          bowlingService.frames[9].status = FrameStatus.Spare;
          bowlingService.throwBall();
        });

        it('should create the bonus frame', () => {
          expect((dependencies.frameFactory.create as jasmine.Spy).calls.count()).toBe(1);
        });
      });

      describe('when the last frame is a strike frame', () => {
        beforeEach(() => {
          (dependencies.frameFactory.create as jasmine.Spy).calls.reset();
          bowlingService.frames[9].status = FrameStatus.Strike;
          bowlingService.throwBall();
        });

        it('should create the bonus frame', () => {
          expect((dependencies.frameFactory.create as jasmine.Spy).calls.count()).toBe(1);
        });
      });
    });
  });
});
