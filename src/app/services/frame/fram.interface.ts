import { Bowl } from '../bowl/bowl.service';

export enum FrameStatus {
  Default = 'default',
  Strike = 'strike',
  Spare = 'spare'
}

export interface IFrame {
  points: Array<number>;
  total: number;
  isCompleted: boolean;
  play(): Bowl;

  addBowl(bowl: Bowl): void;
}
