import { Injectable } from '@angular/core';
import { SharedUiModule} from '../../sharedui.module';
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

import * as debugMenu from 'debug-menu';

@Injectable({
  providedIn: SharedUiModule
})
export class ElectronManagerService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      try {
        //console.log('SETTING UP THE WINDOW');
        var win = remote.getCurrentWindow();
        if (win.webContents.isDevToolsOpened()) {
          const menu = remote.Menu.buildFromTemplate([{
            label: 'Debug',
            submenu: debugMenu.windowDebugMenu(win)
          }]);

          if (process.platform !== 'darwin') {
            win.setMenu(menu);
          } else {
            remote.Menu.setApplicationMenu(menu);
          }
          debugMenu.install();
        }
      } catch (err) {
        //console.log('err in context menu', err);
      }
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  public reloadApplication() {
    var focusedWindow = this.remote.BrowserWindow ? this.remote.BrowserWindow.getFocusedWindow() : null;
    if (focusedWindow) {
      focusedWindow.reload();
    }
  }

  public logToConsole(anything: any) {
    var win = remote.getCurrentWindow();
    if (win.webContents.isDevToolsOpened()) {
      //console.log(anything);
    }
  }
}
