import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMessageComponent } from './trip-message.component';

describe('TripMessageComponent', () => {
  let component: TripMessageComponent;
  let fixture: ComponentFixture<TripMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
