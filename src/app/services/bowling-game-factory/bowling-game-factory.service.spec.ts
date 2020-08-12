import { BowlingGame } from '../bowling-game/bowling.game';
import { FrameFactoryService } from '../frame-factory/frame-factory.service';
import { FrameFactoryStub } from '../frame-factory/frame-factory.sevice.stub';

import { BowlingGameFactoryService } from './bowling-game-factory.service';

fdescribe('BowlingGameFactoryService', () => {
  let bowlingGameFactory: BowlingGameFactoryService,
    dependencies: { frameFactory: FrameFactoryStub };

  beforeEach(() => {
    dependencies = { frameFactory: new FrameFactoryStub() };
    bowlingGameFactory = new BowlingGameFactoryService(dependencies.frameFactory as FrameFactoryService);
  });

  describe('when requesting an instance', () => {
    it('should provide an instance of a game', () => {
      expect(bowlingGameFactory.create() instanceof BowlingGame).toBe(true);
    });
  });
});
