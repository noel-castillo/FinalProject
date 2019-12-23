import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureTravelerComponent } from './adventure-traveler.component';

describe('AdventureTravelerComponent', () => {
  let component: AdventureTravelerComponent;
  let fixture: ComponentFixture<AdventureTravelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureTravelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
