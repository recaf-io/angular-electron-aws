import { Component, OnInit } from '@angular/core';

import { AwsStsService } from '../../../aws/service/sts/aws-sts.service';

import {STS} from 'aws-sdk';

//ng generate component modules/awsui/components/selfInfo --module awsui
@Component({
  selector: 'app-self-info',
  templateUrl: './self-info.component.html',
  styleUrls: ['./self-info.component.scss']
})
export class SelfInfoComponent implements OnInit {
  public me: STS.GetCallerIdentityResponse;

  constructor(private sts: AwsStsService) { }

  async ngOnInit() {
    this.me = await this.sts.GetMyIdentity();
  }

}
