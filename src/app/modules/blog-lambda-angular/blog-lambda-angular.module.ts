import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LambdaInvokeComponent } from './components/lambda-invoke/lambda-invoke.component';

//ng generate module modules/blog-lambda-angular 
@NgModule({
  declarations: [LambdaInvokeComponent],
  imports: [
    CommonModule
  ]
})
export class BlogLambdaAngularModule { }
