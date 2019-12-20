import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCalendarComponent } from './trip-calendar.component';

describe('TripCalendarComponent', () => {
  let component: TripCalendarComponent;
  let fixture: ComponentFixture<TripCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
