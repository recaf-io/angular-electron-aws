import { TestBed } from '@angular/core/testing';

import { AwsOrgsService } from './aws-orgs.service';

describe('AwsOrgsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsOrgsService = TestBed.get(AwsOrgsService);
    expect(service).toBeTruthy();
  });
});
