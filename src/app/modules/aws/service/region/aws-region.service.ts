import { Injectable, Inject } from '@angular/core';
import { AwsModule} from '../../aws.module';

import {AwsRegionModel} from '../../models/region/aws-region-model';
import { AwsCredentialsService } from '../credentials/aws-credentials.service';

import * as AWS from 'aws-sdk';
import { debug } from 'util';

//ng generate service modules/aws/service/region/AwsRegion
@Injectable({
  providedIn: AwsModule
})
export class AwsRegionService {
  private ec2:AWS.EC2;
  constructor(private credentialsService: AwsCredentialsService){
    //@Inject('aws_config') private config:AWS.EC2.ClientConfiguration) { 
      //this.ec2 = new AWS.EC2(config);
      this.populateLocalRegions();
  }

  private async runSetup() {
    if (this.ec2) {
        return this.ec2;
    } else {
        let credentials = await this.credentialsService.getCredentials();
        let config: AWS.EC2.ClientConfiguration = {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretKey,
            region: credentials.defaultRegion
        }
        this.ec2 = new AWS.EC2(config);
    }

}
  
  private regions:AwsRegionModel[];

  private populateLocalRegions(){
    this.regions = new Array<AwsRegionModel>();

    //eventually read the following from an updatable JSON file
    this.regions.push(new AwsRegionModel("us-east-2","US East (Ohio)"));
    this.regions.push(new AwsRegionModel("us-east-1","US East (N. Virginia)"));
    this.regions.push(new AwsRegionModel("us-west-1","US West (N. California)"));
    this.regions.push(new AwsRegionModel("us-west-2","US West (Oregon)"));
    this.regions.push(new AwsRegionModel("ap-south-1","Asia Pacific (Mumbai)"));
    this.regions.push(new AwsRegionModel("ap-northeast-2","Asia Pacific (Seoul)"));
    this.regions.push(new AwsRegionModel("ap-northeast-3","Asia Pacific (Osaka-Local)"));
    this.regions.push(new AwsRegionModel("ap-southeast-1","Asia Pacific (Singapore)"));
    this.regions.push(new AwsRegionModel("ap-southeast-2","Asia Pacific (Sydney)"));
    this.regions.push(new AwsRegionModel("ap-northeast-1","Asia Pacific (Tokyo)"));
    this.regions.push(new AwsRegionModel("cn-north-1","China (Beijing)"));
    this.regions.push(new AwsRegionModel("cn-northwest-1","China (Ningxia)"));
    this.regions.push(new AwsRegionModel("eu-central-1","EU (Frankfurt)"));
    this.regions.push(new AwsRegionModel("eu-west-1","EU (Ireland)"));
    this.regions.push(new AwsRegionModel("eu-west-2","EU (London)"));
    this.regions.push(new AwsRegionModel("eu-west-3","EU (Paris)"));
    this.regions.push(new AwsRegionModel("eu-north-1","EU (Stockholm)"));
    this.regions.push(new AwsRegionModel("sa-east-1","South America (São Paulo)"));
    this.regions.push(new AwsRegionModel("ca-central-1","Canada (Central)"));



  }

  public async GetRegions(cb:(regions:AwsRegionModel[])=>void):Promise<void>{
    await this.runSetup();
    let regions = this.ec2.describeRegions((err,data)=>{
      let retList = new Array<AwsRegionModel>();
      data.Regions.map(d=>{ retList.push(new AwsRegionModel(d.RegionName, this.regions.filter(f=>{return f.value == d.RegionName})[0].name, d.Endpoint )); });
      cb(retList);
    });
  }

  public async GetRegionsWithConfig(config:AWS.EC2.ClientConfiguration,cb:(regions:AwsRegionModel[])=>void ):Promise<void>{
    await this.runSetup();
    let tempec2 = new AWS.EC2(config);
    //console.log("config",config);
    let regions = tempec2.describeRegions((err,data)=>{
      let retList = new Array<AwsRegionModel>();
      data.Regions.map(d=>{ 

        let staticRegions = this.regions.filter(f=>{
          return f.value == d.RegionName
        });
        if(staticRegions && staticRegions.length > 0){
          let selectedRegionModel = new AwsRegionModel(d.RegionName, staticRegions[0].name, d.Endpoint );
          if(selectedRegionModel){
            retList.push(selectedRegionModel); 
          }
        }
      });
      cb(retList);
    });
  }
}
