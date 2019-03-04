import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import * as material from '@angular/material';
import * as dialog from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';

import * as aws from './modules/aws/aws.module'
import * as awsui from './modules/awsui/awsui.module'
import * as sharedui from './modules/sharedui/sharedui.module';
import * as shared from './modules/shared/shared.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    //material
    material.MatButtonModule, material.MatCheckboxModule, material.MatListModule, material.MatCardModule, material.MatFormFieldModule,material.MatInputModule,material.MatExpansionModule, 
    material.MatIconModule, material.MatToolbarModule, material.MatMenuModule, material.MatSidenavModule, material.MatSelectModule, material.MatGridListModule, material.MatTooltipModule,
    material.MatProgressSpinnerModule, material.MatTabsModule, material.MatCheckboxModule,material.MatAutocompleteModule, material.MatChipsModule, material.MatSnackBarModule,
    dialog.MatDialogModule,
    //flex
    FlexLayoutModule,
    sharedui.SharedUiModule,
    shared.SharedModule,
    //home grown aws modules
    aws.AwsModule,
    awsui.AwsuiModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
