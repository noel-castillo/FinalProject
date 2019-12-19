import { TestBed } from '@angular/core/testing';

import { TripMessageService } from './trip-message.service';

describe('TripMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripMessageService = TestBed.get(TripMessageService);
    expect(service).toBeTruthy();
  });
});
