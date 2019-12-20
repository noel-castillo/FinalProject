import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTravelerComponent } from './trip-traveler.component';

describe('TripTravelerComponent', () => {
  let component: TripTravelerComponent;
  let fixture: ComponentFixture<TripTravelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTravelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
