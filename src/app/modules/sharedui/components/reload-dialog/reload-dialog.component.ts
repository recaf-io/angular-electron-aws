import { Component, OnInit } from '@angular/core';
//import { ElectronManagerService } from '../../service/electron-manager/electron-manager.service';

@Component({
  selector: 'app-reload-dialog',
  templateUrl: './reload-dialog.component.html',
  styleUrls: ['./reload-dialog.component.scss']
})
export class ReloadDialogComponent implements OnInit {

  //constructor(private electronService: ElectronManagerService) { }

  ngOnInit() {
  }


  public reloadApplication(): void {
    let remote = window.require('electron').remote;
    var focusedWindow = remote.BrowserWindow ? remote.BrowserWindow.getFocusedWindow() : null;
    if (focusedWindow) {
      focusedWindow.reload();
    }
  }

}
