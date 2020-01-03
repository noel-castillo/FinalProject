import { LatestMessagePipe } from './latest-message.pipe';

describe('LatestMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new LatestMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
