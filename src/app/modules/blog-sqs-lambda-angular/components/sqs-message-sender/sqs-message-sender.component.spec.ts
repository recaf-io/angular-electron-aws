import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqsMessageSenderComponent } from './sqs-message-sender.component';

describe('SqsMessageSenderComponent', () => {
  let component: SqsMessageSenderComponent;
  let fixture: ComponentFixture<SqsMessageSenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqsMessageSenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqsMessageSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
