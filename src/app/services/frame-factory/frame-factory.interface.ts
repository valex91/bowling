import { Frame } from '../frame/frame';

export interface IFrameFactory {
  create(): Frame;
}
