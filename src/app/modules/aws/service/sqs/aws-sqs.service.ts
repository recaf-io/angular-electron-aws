import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { AwsModule } from '../../aws.module';
import { AwsCredentialsService } from '../credentials/aws-credentials.service';

@Injectable({
  providedIn: AwsModule
})
export class AwsSqsService {
  private sqsService: AWS.SQS;

  constructor(private credentialsService: AwsCredentialsService) { }

  private async runSetup() {
    if (this.sqsService) {
        return this.sqsService;
    } else {
        let credentials = await this.credentialsService.getCredentials();
        let config: AWS.STS.ClientConfiguration = {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretKey,
            region: credentials.defaultRegion
        }
        this.sqsService = new AWS.SQS(config);
    }

}

  public addNumberToMessageAttributes(ma: AWS.SQS.MessageBodyAttributeMap, name: string, value: number){
    ma[name] = {
      DataType: "String",
      StringValue: String(value)
    };
    return ma;
  }

  public addStringToMessageAttributes(ma: AWS.SQS.MessageBodyAttributeMap, name: string, value: string){
    ma[name] = {
      DataType: "String",
      StringValue: value
    };
    return ma;
  }

  public async sendMessage(queueUrl: string, messageBody: string, inputs: AWS.SQS.MessageBodyAttributeMap): Promise<AWS.SQS.SendMessageResult>{
    await this.runSetup();
    let request: AWS.SQS.SendMessageRequest = {
      QueueUrl: queueUrl,
      MessageBody: messageBody,
      MessageAttributes: inputs
    };

    return new Promise((resolve, reject)=>{
      this.sqsService.sendMessage(request,  (err, data) => {
        if(err){
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }
}
