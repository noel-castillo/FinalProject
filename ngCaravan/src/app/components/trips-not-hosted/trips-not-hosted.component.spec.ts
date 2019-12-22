import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsNotHostedComponent } from './trips-not-hosted.component';

describe('TripsNotHostedComponent', () => {
  let component: TripsNotHostedComponent;
  let fixture: ComponentFixture<TripsNotHostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsNotHostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsNotHostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
