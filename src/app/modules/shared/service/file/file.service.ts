import { Injectable } from "@angular/core";
import * as path2 from 'path';
import * as fs from 'fs';
import * as storage from 'electron-json-storage';

import { SharedModule }from '../../shared.module';

export enum ConfigurationFileType {
    main = 0,
    iAMRunAs = 1
}

export interface configFileSettings { }

export interface IAMRunAsSettings extends configFileSettings {
    permanenetlyHideSuccessfulLoad: boolean
}

@Injectable({
  providedIn: SharedModule
})
export class FileService {
  private path: string;

  constructor() {
      this.path = process.cwd() + '/';
      
  }

  public loadFile<T>(configType: ConfigurationFileType): Promise<T> {
      return new Promise(async (resolve, reject) => {
          let fileKey = configType.toString();
          if (fileKey) {
              let fileData = null;
              try {
                  fileData = await this.getStorage(fileKey);
                  resolve(fileData);
              }
              catch (err) {
                  reject(err);
              }
          }

          resolve(null);
      });
  }

  public saveConfiguration<T>(configType: ConfigurationFileType, model: T): Promise<any> {
      let t = this;
      return new Promise(async (resolve, reject) => {
          let fileKey = configType.toString();
          var result = this.setStorage(fileKey, <object><any>model);

      });
  }

  private async getStorage(key: string): Promise<object> {
      return new Promise((resolve, reject) => {
          let fileData = null;
          try {
              storage.get(key, function (err, data) {
                  if (err) {
                      reject(err);
                  }
                  else {
                      resolve(data);
                  }
              });
          }
          catch (err) {
              reject(err);
          }
      });
  }

  private async setStorage(key: string, value: object): Promise<object> {
      return new Promise((resolve, reject) => {
          let fileData = null;
          try {
              storage.set(key, value, (err) => {
                  if (err) {
                      reject(err);
                  }
                  else {
                      resolve();
                  }
              });
          }
          catch (err) {
              reject(err);
          }
      });
  }

  private async removeStorage(key: string): Promise<object> {
      return new Promise((resolve, reject) => {
          let fileData = null;
          try {
              storage.remove(key, (err) => {
                  if (err) {
                      reject(err);
                  }
                  else {
                      resolve();
                  }
              });
          }
          catch (err) {
              reject(err);
          }
      });
  }
}
