import { FrameStub } from '../frame/frame.service.stub';
import { IBowlingGame } from './bowling-game.interface';


export class BowlingGameStub implements IBowlingGame {
  public isFinished: () => boolean = jasmine.createSpy('bowlingGameStub.isFinished');
  public frames: Array<FrameStub>;
  public throwBall: () => void = jasmine.createSpy('bowlingGameStub.throwball');
}
