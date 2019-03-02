import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {SharedUiModule} from '../sharedui/sharedui.module';

//import {SharedUiModule} from '../sharedui/sharedui.module';
import { AwsCredentialsComponent  } from './components/aws.credentials/aws.credentials.component';

import {AwsModule} from '../aws/aws.module';
import { SelfInfoComponent } from './components/self-info/self-info.component';


@NgModule({
  declarations: [AwsCredentialsComponent, SelfInfoComponent], 
  exports:[SelfInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedUiModule,
    AwsModule,
    //material
    material.MatButtonModule, material.MatCheckboxModule, material.MatListModule, material.MatCardModule, material.MatFormFieldModule,material.MatInputModule,material.MatExpansionModule, 
    material.MatIconModule, material.MatToolbarModule, material.MatMenuModule, material.MatSidenavModule, material.MatSelectModule, material.MatGridListModule, material.MatTooltipModule,
    material.MatProgressSpinnerModule, material.MatTabsModule, material.MatCheckboxModule,material.MatAutocompleteModule, material.MatChipsModule, material.MatSnackBarModule
  ]
})
export class AwsuiModule { }
