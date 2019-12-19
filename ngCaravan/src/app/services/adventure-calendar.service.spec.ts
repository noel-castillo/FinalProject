import { TestBed } from '@angular/core/testing';

import { AdventureCalendarService } from './adventure-calendar.service';

describe('AdventureCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdventureCalendarService = TestBed.get(AdventureCalendarService);
    expect(service).toBeTruthy();
  });
});
