import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { AwsModule } from '../../aws.module';
import { AwsCredentialsService } from '../credentials/aws-credentials.service';

// ng generate service modules/aws/service/lambda/aws-lambda
@Injectable({
  providedIn: AwsModule
})
export class AwsLambdaService {
  private lambdaService: AWS.Lambda;

  constructor(private credentialsService: AwsCredentialsService) { }

  private async runSetup() {
    if (this.lambdaService) {
        return this.lambdaService;
    } else {
        let credentials = await this.credentialsService.getCredentials();
        let config: AWS.STS.ClientConfiguration = {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretKey,
            region: credentials.defaultRegion
        }
        console.log('CREATING LAMBDA SERVICE!');
        this.lambdaService = new AWS.Lambda(config);
    }

  }

  /* docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#invoke-property
  */
  public async invokeLambda(functionName: string, functionArgs: any) : Promise<AWS.Lambda.InvocationResponse> {
    await this.runSetup();

    let request1: AWS.Lambda.InvocationRequest = {
      FunctionName: functionName,
      Payload: JSON.stringify(functionArgs),
      InvocationType: 'RequestResponse'
    };
    return new Promise(async (resolve, reject)=>{
      await this.lambdaService.invoke(request1,  (err, data) => {
        if(err){
          reject(err);
          return;
        }
        resolve(data);
      });
    });
    /*
    let request: AWS.Lambda.InvokeAsyncRequest = {
      FunctionName: functionName,
      InvokeArgs: JSON.stringify(functionArgs),
      
    };

    return new Promise(async (resolve, reject)=>{
      var result = await this.lambdaService.invokeAsync(request,  (err, data) => {
        debugger;
        if(err){
          reject(err);
          return;
        }
        resolve(data);
      });

      debugger;
      let x = 1;
    });
    */
  }
}
