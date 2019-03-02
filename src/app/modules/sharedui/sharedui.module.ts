import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';
import * as dialog from '@angular/material/dialog';
import { ReloadDialogComponent } from './components/reload-dialog/reload-dialog.component';

@NgModule({
  declarations: [ReloadDialogComponent],
  imports: [
    CommonModule,
    //material
    material.MatButtonModule, material.MatCheckboxModule, material.MatListModule, material.MatCardModule, material.MatFormFieldModule,material.MatInputModule,material.MatExpansionModule, 
    material.MatIconModule, material.MatToolbarModule, material.MatMenuModule, material.MatSidenavModule, material.MatSelectModule, material.MatGridListModule, material.MatTooltipModule,
    material.MatProgressSpinnerModule, material.MatTabsModule, material.MatCheckboxModule,material.MatAutocompleteModule, material.MatChipsModule, material.MatSnackBarModule,
    dialog.MatDialogModule
  ],
  entryComponents:[
    ReloadDialogComponent
  ]
})
export class SharedUiModule { }


