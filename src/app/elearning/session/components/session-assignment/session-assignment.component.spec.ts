import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAssignmentComponent } from './session-assignment.component';

describe('SessionAssignmentComponent', () => {
  let component: SessionAssignmentComponent;
  let fixture: ComponentFixture<SessionAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
