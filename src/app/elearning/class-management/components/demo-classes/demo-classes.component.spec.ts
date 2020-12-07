import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoClassesComponent } from './demo-classes.component';

describe('DemoClassesComponent', () => {
  let component: DemoClassesComponent;
  let fixture: ComponentFixture<DemoClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
