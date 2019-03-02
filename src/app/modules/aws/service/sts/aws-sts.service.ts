import * as AWS from 'aws-sdk';
import { Injectable, Inject } from '@angular/core';
import { AwsModule } from '../../aws.module';

import { AwsCredentialsService } from '../credentials/aws-credentials.service';
import { debug } from 'util';

@Injectable({
  providedIn: AwsModule
})
export class AwsStsService {
  private securityTokenService: AWS.STS;

  constructor(@Inject('aws_config') private config: AWS.STS.ClientConfiguration, private credentialsService: AwsCredentialsService) {
      console.log('CONFIG ', this.config);
        //this.setupCredentials().then(()=>{});

      //this.securityTokenService = new AWS.STS(config);
  }

  private async setupCredentials(){
    if(!this.config.accessKeyId){
        let creds = await this.credentialsService.getCredentials();
        if(!this.config.accessKeyId){
            this.config.accessKeyId = creds.accessKey;
            this.config.secretAccessKey = creds.secretKey;
            this.config.region = creds.defaultRegion;
        }
        debugger;
    }
  }

  public async GetMyIdentity(): Promise<AWS.STS.GetCallerIdentityResponse> {
      await this.setupCredentials();
      this.securityTokenService = new AWS.STS(this.config);
      let request: AWS.STS.GetCallerIdentityRequest = {

      };
      return new Promise((resolve, reject) => {
          this.securityTokenService.getCallerIdentity(request, (err, data) => {
              debugger;
              resolve(data);
          });
      });
  }

  public async CreateNewAssumeRoleAccount(accountSessionName: string, roleArn: string, durationInSeconds: number): Promise<AWS.STS.AssumeRoleResponse> {
      let request: AWS.STS.AssumeRoleRequest = {
          RoleArn: roleArn,
          RoleSessionName: accountSessionName,
          DurationSeconds: durationInSeconds
      };
      return new Promise((resolve, reject) => {
          this.securityTokenService.assumeRole(request, (err, data) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(data);
              }
          });
      });
  }

  public async CreateAssumeRoleInOtherAccount(accountName: string, accountId: string, roleName: string, durationInSeconds: number): Promise<AWS.STS.AssumeRoleResponse>{
      let roleArn: string = "arn:aws:iam::"+accountId+":role/" + roleName;
      let request: AWS.STS.AssumeRoleRequest = {
          RoleArn: roleArn,
          RoleSessionName: accountName,
          DurationSeconds: durationInSeconds
      };
      return new Promise((resolve, reject) => {
          this.securityTokenService.assumeRole(request, (err, data) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(data);
              }
          });
      });
  }
}
