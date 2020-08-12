import { Injectable } from '@angular/core';
import { Frame } from '../frame/frame';
import { IFrameFactory } from './frame-factory.interface';
import createSpy = jasmine.createSpy;

@Injectable()
export class FrameFactoryStub implements IFrameFactory {
  public create: () => Frame = createSpy('frameFactory.create');
}
