import { CloudWatch, CloudWatchLogs } from 'aws-sdk';
import { Injectable, Inject } from '@angular/core';
import { AwsModule } from '../../aws.module';
import { AwsCredentialsService } from '../credentials/aws-credentials.service';

@Injectable({
  providedIn: AwsModule
})
export class AwsCloudwatchService {
  private cloudwatch:CloudWatch;
  private cloudwatchLogs:CloudWatchLogs;

  constructor(
    private credentialsService: AwsCredentialsService) {
      //this.cloudwatch = new CloudWatch(configCloudWatch);   
  }

  private async runSetup() {
    if (this.cloudwatch) {
        return this.cloudwatch;
    } else {
        let credentials = await this.credentialsService.getCredentials();
        let config: AWS.CloudWatch.ClientConfiguration = {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretKey,
            region: credentials.defaultRegion
        }
        this.cloudwatch = new CloudWatch(config);
    }

}

  public async ListDashboards():Promise<AWS.CloudWatch.ListDashboardsOutput> {
    await this.runSetup();
    return new Promise((resolve, reject) => {
        this.cloudwatch.listDashboards((err, data)=>{
            resolve(data);
        });
    });
  }
}
