import { TestBed } from '@angular/core/testing';

import { AdventureService } from './adventure.service';

describe('AdventureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdventureService = TestBed.get(AdventureService);
    expect(service).toBeTruthy();
  });
});
