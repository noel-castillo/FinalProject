import { TripRequestPipe } from './trip-request.pipe';

describe('TripRequestPipe', () => {
  it('create an instance', () => {
    const pipe = new TripRequestPipe();
    expect(pipe).toBeTruthy();
  });
});
