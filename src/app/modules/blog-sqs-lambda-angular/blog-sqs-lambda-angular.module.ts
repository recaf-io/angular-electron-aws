import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqsMessageSenderComponent } from './components/sqs-message-sender/sqs-message-sender.component';

import * as material from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SqsMessageSenderComponent],
  exports:[SqsMessageSenderComponent],
  imports: [
    CommonModule,
    FormsModule,
    material.MatCardModule, material.MatButtonModule,material.MatFormFieldModule, material.MatFormFieldModule, material.MatInputModule, material.MatIconModule,
    material.MatListModule, material.MatProgressSpinnerModule
  ]
})
export class BlogSqsLambdaAngularModule { 

}
