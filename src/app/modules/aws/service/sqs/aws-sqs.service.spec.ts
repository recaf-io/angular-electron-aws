import { TestBed } from '@angular/core/testing';

import { AwsSqsService } from './aws-sqs.service';

describe('AwsSqsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsSqsService = TestBed.get(AwsSqsService);
    expect(service).toBeTruthy();
  });
});
