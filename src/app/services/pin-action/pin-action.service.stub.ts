import { IPinAction } from './pin-action.interface';

export class PinActionServiceStub implements IPinAction {
  public throwBall: () => number = jasmine.createSpy('pinActionService.throwBall');
}
