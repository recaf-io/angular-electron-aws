import { Component, OnInit } from '@angular/core';
import {AwsLambdaService} from '../../../aws/service/lambda/aws-lambda.service';

//ng generate component modules/blog-lambda-angular/components/lambda-invoke
@Component({
  selector: 'app-lambda-invoke',
  templateUrl: './lambda-invoke.component.html',
  styleUrls: ['./lambda-invoke.component.scss']
})
export class LambdaInvokeComponent implements OnInit {
  public lambdaName: string = null;
  public lambdaInput1: number = null;//x1
  public lambdaInput2: number = null;//x2
  public fullResponse: AWS.Lambda.InvocationResponse;
  public lambdaResponse: any;//y will be a property nested in here -- lambdaResponse?.result?.y
  public processing: boolean = false;

  constructor(private lambdaService: AwsLambdaService) { }

  ngOnInit() {
  }

  //this function called via button click
  public async invokeLambda(){
    this.processing = true;

    let request = {
      x1: this.lambdaInput1,
      x2: this.lambdaInput2
    };
    //invoke lambda from the lambda service
    let response = await this.lambdaService.invokeLambda(this.lambdaName, request);
    this.fullResponse = response;
    //parse the response data from our function
    this.lambdaResponse = JSON.parse(response.Payload.toString());

    this.processing = false;
  }
}
