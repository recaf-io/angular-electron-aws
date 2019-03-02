import { TestBed } from '@angular/core/testing';

import { AwsIamService } from './aws-iam.service';

describe('AwsIamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsIamService = TestBed.get(AwsIamService);
    expect(service).toBeTruthy();
  });
});
