import { Bowl } from '../bowl/bowl.service';
import { FrameFactoryService } from '../frame-factory/frame-factory.service';
import { FrameStatus } from '../frame/fram.interface';
import { Frame } from '../frame/frame';

export class BowlingGame {
  public frames: Array<Frame> = [];

  private _currentFrame: Frame;

  private _frameFactory: FrameFactoryService;

  constructor(frameFactory: FrameFactoryService) {
    this._frameFactory = frameFactory;
  }

  public throwBall(): void {
    if (this.isFinished()) {
      return;
    }

    if (!this._currentFrame) {
      this._currentFrame = this._frameFactory.create();
    }

    if (!this._currentFrame.isCompleted) {
      const previousFrames: Array<Frame> = [this.frames[this.frames.length - 2], this.frames[this.frames.length - 1]],
        currentThrown: Bowl = this._currentFrame.play();

      previousFrames.forEach((frame) => {
        if (frame) {
          frame.addBowl(currentThrown);
        }
      });

    } else {
      this.frames.push(this._currentFrame);
      this._currentFrame = null;

      this.throwBall();
    }
  }

  public isFinished(): boolean {
    return (this.frames.length === 10 && this.frames[9].status === FrameStatus.Default) || this.frames.length >= 12;
  }
}
