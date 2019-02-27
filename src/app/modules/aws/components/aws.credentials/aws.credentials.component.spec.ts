import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Aws.CredentialsComponent } from './aws.credentials.component';

describe('Aws.CredentialsComponent', () => {
  let component: Aws.CredentialsComponent;
  let fixture: ComponentFixture<Aws.CredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aws.CredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Aws.CredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
