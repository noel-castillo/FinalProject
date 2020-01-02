import { TestBed } from '@angular/core/testing';

import { DirectMessageService } from './direct-message.service';

describe('DirectMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectMessageService = TestBed.get(DirectMessageService);
    expect(service).toBeTruthy();
  });
});
