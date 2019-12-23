import { TestBed } from '@angular/core/testing';

import { AdventureTravelerService } from './adventure-traveler.service';

describe('AdventureTravelerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdventureTravelerService = TestBed.get(AdventureTravelerService);
    expect(service).toBeTruthy();
  });
});
