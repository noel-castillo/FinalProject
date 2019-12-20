import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureCalendarComponent } from './adventure-calendar.component';

describe('AdventureCalendarComponent', () => {
  let component: AdventureCalendarComponent;
  let fixture: ComponentFixture<AdventureCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
