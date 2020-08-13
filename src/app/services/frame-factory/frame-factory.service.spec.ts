import { Frame } from '../frame/frame';
import { PinActionServiceStub } from '../pin-action/pin-action.service.stub';
import { FrameFactoryService } from './frame-factory.service';

describe('frameFactoryService', () => {
  let frameFactory: FrameFactoryService,
    dependencies: { pinAction: PinActionServiceStub };

  beforeEach(() => {
    dependencies = { pinAction: new PinActionServiceStub() };
    frameFactory = new FrameFactoryService(dependencies.pinAction as PinActionServiceStub);
  });

  describe('when requesting an instance', () => {
    it('should provide an instance of a game', () => {
      expect(frameFactory.create() instanceof Frame).toBe(true);
    });
  });
});

