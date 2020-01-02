import { TestBed } from '@angular/core/testing';

import { AdventureHostService } from './adventure-host.service';

describe('AdventureHostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdventureHostService = TestBed.get(AdventureHostService);
    expect(service).toBeTruthy();
  });
});
