import { Component, Inject, OnInit, isDevMode } from '@angular/core';
import { shell } from 'electron';
import * as electron from 'electron';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

interface iconData {
  fileName: string,
  iconName: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private router: Router,
    private translate: TranslateService) {

    this.isDoneLoading = false;
    this.registerAllIcons();
    translate.setDefaultLang('en');
    
    console.log('AppConfig', AppConfig);

    this.titleService.setTitle('Recaf AWS | Dashboard');
    router.events.subscribe((event) => {
      //console.log('router event', event);
      if (event instanceof NavigationEnd) {
        let newTitle = this.getUrlTitle(event.url);
        this.pageTitle = newTitle;
        this.titleService.setTitle('Recaf AWS | ' + newTitle);
      }
    });

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  
  public isDoneLoading: boolean = false;

  public pageTitle: string = 'Dashboard';
  private icons: iconData[] = [
    { fileName: 'baseline-menu-24px.svg', iconName: 'menu' },
    { fileName: 'baseline-accessibility-24px.svg', iconName: 'accessibility' },
    { fileName: 'baseline-build-24px.svg', iconName: 'build' },
    { fileName: 'baseline-dashboard-24px.svg', iconName: 'dashboard' },
    { fileName: 'baseline-face-24px.svg', iconName: 'face' },
    { fileName: 'baseline-security-24px.svg', iconName: 'security' },
    { fileName: 'baseline-swap_horizontal_circle-24px.svg', iconName: 'circle' },
    { fileName: 'baseline-save-24px.svg', iconName: 'save' },
    { fileName: 'baseline-refresh-24px.svg', iconName: 'refresh' },
    { fileName: 'baseline-done_all-24px.svg', iconName: 'done-all' },
    { fileName: 'baseline-hourglass_empty-24px.svg', iconName: 'hourglass-empty' },
    { fileName: 'baseline-settings-20px.svg', iconName: 'config' },
    { fileName: 'baseline-perm_identity-24px.svg', iconName: 'id' },
    { fileName: 'baseline-add_circle_outline-24px.svg', iconName: 'plus-circle-outline' },
    { fileName: 'baseline-thumbs_up_down-24px.svg', iconName: 'thumbs' },
    { fileName: 'baseline-thumb_up-24px.svg', iconName: 'thumbs-up' },
    { fileName: 'baseline-thumb_down-24px.svg', iconName: 'thumbs-down' },
    { fileName: 'baseline-close-24px.svg', iconName: 'close' },
    { fileName: 'baseline-lock_open-24px.svg', iconName: 'lock-open' },
    { fileName: 'baseline-people_outline-24px.svg', iconName: 'people-outline' },
    { fileName: 'baseline-person-24px.svg', iconName: 'person' },
    { fileName: 'baseline-perm_data_setting-24px.svg', iconName: 'data-setting' },
    { fileName: 'baseline-help_outline-24px.svg', iconName: 'help' },
    { fileName: 'baseline-person_outline-24px.svg', iconName: 'person-outline' },
    { fileName: 'outline-cloud-24px.svg', iconName: 'cloud' }
  ];

  private getUrlTitle(navigationUrl: string): string {
    switch (navigationUrl) {
      case '/':
        return 'Dashboard';
    }
    return 'Dashboard'
  }

  async ngOnInit() {
    
    //console.log('is done loading app component');
    this.isDoneLoading = true;

    if (!isDevMode() && electron.remote.app) {
     
    }
    else{
      console.log('app not found. not running autoupdate');
    }
  }

  private getIconPath(): string {
    return '../../assets/img/icons/';
  }

  private registerAllIcons() {
    this.icons.forEach(id => {
      this.registerIcon(id.iconName, id.fileName);
    });
  }

  private registerIcon(iconName: string, iconFileName: string) {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(this.getIconPath() + iconFileName));
  }

  public hideNavMenu: boolean = false;
  invertNavMenuHideValue(): void {
    this.hideNavMenu = !this.hideNavMenu;
  }

  public openUrl(url: string) {
    shell.openExternal(url);
  }
}
