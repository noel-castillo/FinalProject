import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripProfileComponent } from './trip-profile.component';

describe('TripProfileComponent', () => {
  let component: TripProfileComponent;
  let fixture: ComponentFixture<TripProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
