import { TestBed } from '@angular/core/testing';

import { TripTravelerService } from './trip-traveler.service';

describe('TripTravelerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripTravelerService = TestBed.get(TripTravelerService);
    expect(service).toBeTruthy();
  });
});
