import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';


import {IAM} from 'aws-sdk';

import {AwsCredentialsModel} from '../../../aws/models/credentials/aws-credentials-model';
import {AwsRegionModel} from '../../../aws//models/region/aws-region-model';

import {AwsCredentialsService} from '../../../aws//service/credentials/aws-credentials.service';
import {AwsRegionService} from '../../../aws//service/region/aws-region.service';

import {DialogManagerService} from '../../../sharedui/service/dialog/dialog-manager.service';

import {ReloadDialogComponent} from '../../../sharedui/components/reload-dialog/reload-dialog.component';

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
  saveLocation: string = null;

  constructor( 
    @Inject('aws_config') private config: IAM.ClientConfiguration,
    private regionService: AwsRegionService, 
    private credentialService: AwsCredentialsService,
    private dialogManager: DialogManagerService
  ) { 
    this.saveLocation = this.credentialService.getSaveLocation();
  }

  async ngOnInit() {
    console.log('get credentials');
    let credentials = await this.credentialService.getCredentials();
    let defaultRegion: string = null;
    
    if (credentials) {
        this.accesskey = credentials.accessKey;
        this.secretkey = credentials.secretKey;
        defaultRegion = credentials.defaultRegion;
    }
    await this.regionService.GetRegionsWithConfig({
        accessKeyId: this.accesskey,
        secretAccessKey: this.secretkey,
        region: this.selectedRegion ? this.selectedRegion.value : 'us-west-2'
    },
        (myregions) => {
            this.regions = myregions;
            if (defaultRegion) {
                this.regions.forEach(r => {
                    if (r.value == defaultRegion) {
                        this.selectedRegion = r;
                    }
                });
            }
            this.loadingRegions = false;
        });

    this.saveIntoConfigs();


}

public save() {
  this.credentialService.saveCredentials(
      this.accesskey,
      this.secretkey,
      this.selectedRegion.value,//TODO: Add Region  
      (err) => { console.log(err); },
      () => {
          this.onchange.emit(null);
          this.dialogManager.showDialog(ReloadDialogComponent);
          this.saveIntoConfigs();
      }
  );
}

private saveIntoConfigs() {

  this.config.accessKeyId = this.accesskey;
  this.config.secretAccessKey = this.secretkey;
  this.config.region = this.selectedRegion ? this.selectedRegion.value : null;
}

}
