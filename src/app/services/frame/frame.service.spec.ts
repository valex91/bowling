import { BowlStub } from '../bowl/bowl.service.stub';
import { PinActionServiceStub } from '../pin-action/pin-action.service.stub';
import { FrameStatus } from './fram.interface';

import { Frame } from './frame';

describe('FrameService', () => {
  let frame: Frame,
    dependency: {
      pinAction: PinActionServiceStub
    };

  beforeEach(() => {
    dependency = {
      pinAction: new PinActionServiceStub()
    };
    frame = new Frame(dependency.pinAction);
  });

  describe('when playing the frame', () => {
    describe('when it is the first throw of the frame', () => {
      describe('when it is a strike', () => {
        beforeEach(() => {
          (dependency.pinAction.throwBall as jasmine.Spy).and.returnValue(10);
          frame.play();
        });

        it('should complete that frame', () => {
          expect(frame.isCompleted).toBe(true);
        });

        it('should mark the frame as a spare', () => {
          expect(frame.status).toBe(FrameStatus.Strike);
        });

        describe('when adding the additional points from future frames due to strike bonus', () => {
          let extraBowls: Array<BowlStub>;

          beforeEach(() => {
            extraBowls = [new BowlStub(), new BowlStub()];
            extraBowls[0].knockedDownPins = 10;
            extraBowls[1].knockedDownPins = 10;
            extraBowls.forEach((bowl: BowlStub) => frame.addBowl(bowl));
          });

          it('should allow the extra point to be registered in this frame', () => {
            expect(frame.total).toBe(30);
          });

          describe('when watching the non bonus points', () => {
            it('should return the single throws', () => {
              expect(frame.points).toEqual([10]);
            });
          });
        });
      });

      describe('when it is not a strike', () => {
        describe('when it is a spare', () => {
          beforeEach(() => {
            (dependency.pinAction.throwBall as jasmine.Spy).and.returnValue(5);
            frame.play();
            frame.play();
          });

          it('should mark the frame as a spare', () => {
            expect(frame.status).toBe(FrameStatus.Spare);
          });

          it('should mark it as completed', () => {
            expect(frame.isCompleted).toBe(true);
          });

          describe('when adding the additional points from future frames due to spare bonus', () => {
            let extraBowls: Array<BowlStub>;

            beforeEach(() => {
              extraBowls = [new BowlStub(), new BowlStub()];
              extraBowls[0].knockedDownPins = 10;
              extraBowls[1].knockedDownPins = 10;
              extraBowls.forEach((bowl: BowlStub) => frame.addBowl(bowl));
            });

            it('should allow the extra point to be registered in this frame', () => {
              expect(frame.total).toBe(20);
            });
          });
        });

        describe('when it is not a spare', () => {
          beforeEach(() => {
            (dependency.pinAction.throwBall as jasmine.Spy).and.returnValue(3);
            frame.play();
            frame.play();
          });

          it('should mark the frame as default', () => {
            expect(frame.status).toBe(FrameStatus.Default);
          });

          it('should mark it as completed', () => {
            expect(frame.isCompleted).toBe(true);
          });

          describe('when attempting to add bonus point', () => {
            let extraBowls: Array<BowlStub>;

            beforeEach(() => {
              extraBowls = [new BowlStub(), new BowlStub()];
              extraBowls[0].knockedDownPins = 10;
              extraBowls[1].knockedDownPins = 10;
              extraBowls.forEach((bowl: BowlStub) => frame.addBowl(bowl));
            });

            it('should not allow the extra point to be registered in this frame', () => {
              expect(frame.total).toBe(6);
            });
          });
        });
      });
    });
  });
});
