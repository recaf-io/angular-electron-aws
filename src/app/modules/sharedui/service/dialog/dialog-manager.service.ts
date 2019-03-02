import { Injectable } from '@angular/core';
import { SharedUiModule} from '../../sharedui.module';
import { MatDialog } from '@angular/material';

import { Component } from '@angular/compiler/src/core';

//ng generate service modules/sharedui/service/dialog/dialogManager
@Injectable({
  providedIn: SharedUiModule
})
export class DialogManagerService {

  constructor(private md:MatDialog) { }

  public showDialog(something: any){
    this.md.open(something);
  }
}
