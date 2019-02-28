import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
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
