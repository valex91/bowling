import { Bowl } from '../bowl/bowl.service';
import { IFrame } from './fram.interface';

export class FrameStub implements IFrame {
  public points: Array<number>;

  public isCompleted: boolean;

  public total: number;

  public addBowl: (bowl: Bowl) => void = jasmine.createSpy('frameStub.addBowl');

  public play: () => Bowl = jasmine.createSpy('frameStub.play');
}
