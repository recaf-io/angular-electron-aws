import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';

import {IAM} from 'aws-sdk';

import {AwsCredentialsModel} from '../../models/credentials/aws-credentials-model';
import {AwsRegionModel} from '../../models/region/aws-region-model';

import {AwsCredentialsService} from '../../service/credentials/aws-credentials.service';
import {AwsRegionService} from '../../service/region/aws-region.service';

@Component({
  selector: 'app-aws.credentials',
  templateUrl: './aws.credentials.component.html',
  styleUrls: ['./aws.credentials.component.scss']
})
export class AwsCredentialsComponent implements OnInit {
  @Output() onchange: EventEmitter<AwsCredentialsModel> = new EventEmitter<AwsCredentialsModel>();
  public accesskey: string = "";
  public secretkey: string = "";
  step: number = 1;
  regions: AwsRegionModel[] = []; //TODO make region selector a component for reuse in header also for single codebase
  selectedRegion: AwsRegionModel;
  loadingRegions: boolean = false;

  constructor( 
    @Inject('aws_config') private config: IAM.ClientConfiguration,
    private regionService: AwsRegionService, 
    private credentialService: AwsCredentialsService

  ) { }

  ngOnInit() {
  }

}
