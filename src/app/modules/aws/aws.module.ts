import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwsCredentialsComponent  } from './components/aws.credentials/aws.credentials.component';
import { AwsCredentialsService } from './service/credentials/aws-credentials.service';
import { AwsRegionService } from './service/region/aws-region.service';

import * as material from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AwsCredentialsComponent],
  imports: [
    CommonModule,
    FormsModule,
    material.MatIconModule, material.MatCardModule, material.MatFormFieldModule, material.MatSelectModule
  ],
  providers: [
    AwsCredentialsService,
    AwsRegionService,
    { 
      provide: 'aws_config',
      useValue:{
        accessKeyId:'',
        secretAccessKey:'',
        region:'us-west-2'
      } 
    }
  ]
})
export class AwsModule { }
