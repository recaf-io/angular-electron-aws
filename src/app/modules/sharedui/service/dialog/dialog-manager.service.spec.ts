import { TestBed } from '@angular/core/testing';

import { DialogManagerService } from './dialog-manager.service';

describe('DialogManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogManagerService = TestBed.get(DialogManagerService);
    expect(service).toBeTruthy();
  });
});
