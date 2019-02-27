import { AwsCredentialsModel } from './aws-credentials-model';

describe('AwsCredentialsModel', () => {
  it('should create an instance', () => {
    expect(new AwsCredentialsModel()).toBeTruthy();
  });
});
