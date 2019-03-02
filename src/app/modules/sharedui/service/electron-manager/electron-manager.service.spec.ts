import { TestBed } from '@angular/core/testing';

import { ElectronManagerService } from './electron-manager.service';

describe('ElectronManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectronManagerService = TestBed.get(ElectronManagerService);
    expect(service).toBeTruthy();
  });
});
