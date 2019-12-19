import { TestBed } from '@angular/core/testing';

import { TripHostService } from './trip-host.service';

describe('TripHostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripHostService = TestBed.get(TripHostService);
    expect(service).toBeTruthy();
  });
});
