import { PinActionService } from './pin-action.service';

describe('PinActionService', () => {
  let pinActionService: PinActionService,
    batch: Array<number>;

  beforeEach(() => {
    pinActionService = new PinActionService();
  });

  describe('when passing an explicit maximum', () => {
    beforeEach(() => {
      batch = Array.from({ length: 100 }, () => {
        return pinActionService.throwBall(99);
      });
    });

    it('should produce only numbers between 0 and the maximum', () => {
      expect(batch.every((n) => n < 100)).toBe(true);
    });
  });

  describe('when passing not passing an explicit maximum', () => {
    beforeEach(() => {
      batch = Array.from({ length: 100 }, () => {
        return pinActionService.throwBall();
      });
    });

    it('should produce only numbers between 0 and the 10', () => {
      expect(batch.every((n) => n < 11)).toBe(true);
    });
  });
});
