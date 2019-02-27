import { TestBed } from '@angular/core/testing';

import { AwsRegionService } from './aws-region.service';

describe('AwsRegionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsRegionService = TestBed.get(AwsRegionService);
    expect(service).toBeTruthy();
  });
});
