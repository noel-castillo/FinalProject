import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureProfileComponent } from './adventure-profile.component';

describe('AdventureProfileComponent', () => {
  let component: AdventureProfileComponent;
  let fixture: ComponentFixture<AdventureProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
