import { Bowl } from './bowl.service';

describe('BowlService', () => {
  let bowl: Bowl;

  beforeEach(() => {
    bowl = new Bowl(1337);
  });

  it('should be created', () => {
    expect(bowl.knockedDownPins).toBe(1337);
  });
});
