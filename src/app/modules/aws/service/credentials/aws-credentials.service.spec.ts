import { TestBed } from '@angular/core/testing';

import { AwsCredentialsService } from './aws-credentials.service';

describe('AwsCredentialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsCredentialsService = TestBed.get(AwsCredentialsService);
    expect(service).toBeTruthy();
  });
});
