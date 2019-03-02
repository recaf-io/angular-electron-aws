import * as AWS from 'aws-sdk';
import { Injectable, Inject } from '@angular/core';
import { AwsModule } from '../../aws.module';

@Injectable({
  providedIn: AwsModule
})
export class AwsOrgsService {
  private organizations: AWS.Organizations;

  constructor(@Inject('aws_org_config') private config: AWS.Organizations.ClientConfiguration) {
      this.organizations = new AWS.Organizations(config);
  }


  public async listAccountsInOrganization(): Promise<AWS.Organizations.ListAccountsResponse> {
      return new Promise((resolve, reject) => {
          try {
              this.organizations.listAccounts((err, data) => {
                  if (err) {
                      if (err.toString().includes('Your account is not a member of an organization.')) {
                          resolve(null);
                      } else {
                          reject(err);
                      }
                  } else {
                      resolve(data);
                  }
              });
          } catch (err) {
              if (err.toString().includes('Your account is not a member of an organization.')) {
                  resolve(null);
              } else {
                  reject(err);
              }
          }
      });
  }
}
