import { APIGateway } from 'aws-sdk';
import { RestApis, GetResourcesRequest, GetMethodRequest, GetStagesRequest, GetDeploymentRequest } from 'aws-sdk/clients/apigateway';
import { Injectable, Inject } from '@angular/core';
import { AwsModule } from '../../aws.module';
import { AwsCredentialsService } from '../credentials/aws-credentials.service';

@Injectable({
  providedIn: AwsModule
})
export class AwsGatewayService {
  private apigateway:APIGateway;

  constructor(private credentialsService: AwsCredentialsService) {
      //this.apigateway = new APIGateway(configApiGateway);   
  }

  private async runSetup() {
    if (this.apigateway) {
        return this.apigateway;
    } else {
        let credentials = await this.credentialsService.getCredentials();
        let config: AWS.APIGateway.ClientConfiguration = {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretKey,
            region: credentials.defaultRegion
        }
        this.apigateway = new APIGateway(config);
    }

}

  /** gets all api's */
  public async getRestApis():Promise<APIGateway.RestApis>{
    await this.runSetup();
    return new Promise((resolve, reject) => {
      this.apigateway.getRestApis((err, data)=>{
        resolve(data);
      });
    });
  }

  /** gets all resources for a given api (resources are parts of api endpoint paths) */
  public async getResources(apiId: string):Promise<APIGateway.Resources>{
    await this.runSetup();
    return new Promise((resolve, reject) => {
      let request:GetResourcesRequest = {
        restApiId  : apiId
      };
      this.apigateway.getResources(request, (err, data)=>{
        resolve(data);
      });
    });
  }

  /** gets all stages for a given api */
  public async getStages(apiId: string):Promise<APIGateway.Stages>{
    await this.runSetup();
    return new Promise((resolve, reject) => {
      let request:GetStagesRequest = {
        restApiId  : apiId
      };
      this.apigateway.getStages(request, (err, data)=>{
        resolve(data);
      });
    });
  }

  /** gets deployment information for a given api and deployment id. includeApiSummary is true by default and will include the apisummary property of the deployment entity */
  public async getDeployment(apiId: string, deploymentId: string, includeApiSummary: boolean = true):Promise<APIGateway.Deployment>{
    await this.runSetup();
    return new Promise((resolve, reject) => {
      let embedSummary: string[] = [];
      if(includeApiSummary == true){
        embedSummary.push("apisummary");
      }
      let request:GetDeploymentRequest = {
        restApiId  : apiId,
        deploymentId: deploymentId,
        embed: embedSummary
      };
      this.apigateway.getDeployment(request, (err, data)=>{
        resolve(data);
      });
    });
  }

  /** gets all deployments for a given api */
  public async getDeployments(apiId: string):Promise<APIGateway.Deployments>{
    await this.runSetup();
    return new Promise((resolve, reject) => {
      let request : AWS.APIGateway.GetDeploymentsRequest = {
        restApiId  : apiId
      };
      this.apigateway.getDeployments(request, (err, data)=>{
        resolve(data);
      });
    });
  }

  /** Retrieves an API Endpoint's information, such as apiKeyRequired, operationName, and methodResponses  */
  public async getResourceMethod(apiId: string, resourceId: string, method: string):Promise<APIGateway.Method>{
    await this.runSetup();
    return new Promise((resolve, reject) => {
      let request:GetMethodRequest = {
        restApiId  : apiId,
        resourceId: resourceId,
        httpMethod: method
      };
      this.apigateway.getMethod(request, (err, data)=>{
        resolve(data);
      });
    });
  }
}
