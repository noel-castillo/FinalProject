import { TestBed } from '@angular/core/testing';

import { TripCalendarService } from './trip-calendar.service';

describe('TripCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripCalendarService = TestBed.get(TripCalendarService);
    expect(service).toBeTruthy();
  });
});
