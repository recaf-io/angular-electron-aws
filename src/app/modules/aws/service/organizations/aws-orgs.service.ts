import * as AWS from 'aws-sdk';
import { Injectable, Inject } from '@angular/core';
import { AwsModule } from '../../aws.module';
import { AwsCredentialsService } from '../credentials/aws-credentials.service';

//aws_org_config is a different region than the usual configured region
@Injectable({
  providedIn: AwsModule
})
export class AwsOrgsService {
  private organizations: AWS.Organizations;

  constructor(private credentialsService: AwsCredentialsService){
      //@Inject('aws_org_config') private config: AWS.Organizations.ClientConfiguration) {
      //this.organizations = new AWS.Organizations(config);
  }

  private async runSetup() {
    if (this.organizations) {
        return this.organizations;
    } else {
        let credentials = await this.credentialsService.getCredentials();
        let config: AWS.Organizations.ClientConfiguration = {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretKey,
            region: credentials.defaultRegion
        }
        this.organizations = new AWS.Organizations(config);
    }

}

  public async listAccountsInOrganization(): Promise<AWS.Organizations.ListAccountsResponse> {
      await this.runSetup();
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
