import { CloudWatch, CloudWatchLogs } from 'aws-sdk';
import { Injectable, Inject } from '@angular/core';
import { AwsModule } from '../../aws.module';

@Injectable({
  providedIn: AwsModule
})
export class AwsCloudwatchService {
  private cloudwatch:CloudWatch;
  private cloudwatchLogs:CloudWatchLogs;

  constructor(
        @Inject('aws_config') private configCloudWatch:CloudWatch.ClientConfiguration,
        @Inject('aws_config') private configCloudWatchLogs:CloudWatchLogs.ClientConfiguration) {
      this.cloudwatch = new CloudWatch(configCloudWatch);   
      this.cloudwatchLogs = new CloudWatchLogs(configCloudWatchLogs);
  }

  public ListDashboards():Promise<AWS.CloudWatch.ListDashboardsOutput> {
    return new Promise((resolve, reject) => {
        this.cloudwatch.listDashboards((err, data)=>{
            resolve(data);
        });
    });
  }
}
