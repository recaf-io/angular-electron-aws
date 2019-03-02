import { TestBed } from '@angular/core/testing';

import { AwsGatewayService } from './aws-gateway.service';

describe('AwsGatewayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsGatewayService = TestBed.get(AwsGatewayService);
    expect(service).toBeTruthy();
  });
});
