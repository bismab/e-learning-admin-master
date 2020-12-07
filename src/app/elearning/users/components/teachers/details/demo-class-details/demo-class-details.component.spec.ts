import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoClassDetailsComponent } from './demo-class-details.component';

describe('DemoClassDetailsComponent', () => {
  let component: DemoClassDetailsComponent;
  let fixture: ComponentFixture<DemoClassDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoClassDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
