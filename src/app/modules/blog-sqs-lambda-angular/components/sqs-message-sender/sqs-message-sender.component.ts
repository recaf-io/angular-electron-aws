import { Component, OnInit } from '@angular/core';
import * as aws from 'aws-sdk';
import {AwsSqsService} from '../../../aws/service/sqs/aws-sqs.service';

@Component({
  selector: 'app-sqs-message-sender',
  templateUrl: './sqs-message-sender.component.html',
  styleUrls: ['./sqs-message-sender.component.scss']
})
export class SqsMessageSenderComponent implements OnInit {
  public sqsUrl: string = null;
  public lambdaInput: number = null;
  public sqsResponse: AWS.SQS.SendMessageResult;
  public processing: boolean = false;

  constructor(private sqs: AwsSqsService){
  }

  async ngOnInit() {

  }

  public async sendTestMessage(){
    this.processing = true;
    this.sqsResponse = null;
    var messageAttributes: AWS.SQS.MessageBodyAttributeMap = {};
    
    messageAttributes = this.sqs.addNumberToMessageAttributes(messageAttributes, "TestNumber", this.lambdaInput);
    
    var sqsResult = await this.sqs.sendMessage(this.sqsUrl, "TEST FROM ANGULAR-ELECTRON-AWS", messageAttributes);

    console.log(sqsResult);

    this.sqsResponse = sqsResult;
    this.processing = false;
  }
}
