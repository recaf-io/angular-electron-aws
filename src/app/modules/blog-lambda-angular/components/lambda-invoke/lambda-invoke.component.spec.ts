import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LambdaInvokeComponent } from './lambda-invoke.component';

describe('LambdaInvokeComponent', () => {
  let component: LambdaInvokeComponent;
  let fixture: ComponentFixture<LambdaInvokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LambdaInvokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LambdaInvokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
