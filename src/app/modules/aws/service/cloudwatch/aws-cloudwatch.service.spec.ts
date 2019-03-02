import { TestBed } from '@angular/core/testing';

import { AwsCloudwatchService } from './aws-cloudwatch.service';

describe('AwsCloudwatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsCloudwatchService = TestBed.get(AwsCloudwatchService);
    expect(service).toBeTruthy();
  });
});
