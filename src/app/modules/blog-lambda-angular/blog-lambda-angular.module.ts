import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LambdaInvokeComponent } from './components/lambda-invoke/lambda-invoke.component';

import * as material from '@angular/material';
import { FormsModule } from '@angular/forms';

//ng generate module modules/blog-lambda-angular 
@NgModule({
  declarations: [LambdaInvokeComponent],
  imports: [
    CommonModule,
    FormsModule,
    material.MatCardModule, material.MatButtonModule,material.MatFormFieldModule, material.MatFormFieldModule, material.MatInputModule, material.MatIconModule,
    material.MatListModule, material.MatProgressSpinnerModule
  ]
})
export class BlogLambdaAngularModule { }
