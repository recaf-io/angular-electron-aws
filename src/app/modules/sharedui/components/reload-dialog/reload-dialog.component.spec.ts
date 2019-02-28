import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadDialogComponent } from './reload-dialog.component';

describe('ReloadDialogComponent', () => {
  let component: ReloadDialogComponent;
  let fixture: ComponentFixture<ReloadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
