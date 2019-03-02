import { TestBed } from '@angular/core/testing';

import { AwsStsService } from './aws-sts.service';

describe('AwsStsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsStsService = TestBed.get(AwsStsService);
    expect(service).toBeTruthy();
  });
});
