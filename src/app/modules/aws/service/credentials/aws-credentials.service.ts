import { Injectable, InjectionToken } from "@angular/core";
import { AwsModule} from '../../aws.module';
import {AwsCredentialsModel} from '../../models/credentials/aws-credentials-model';
import * as storage from 'electron-json-storage';
const cred_key = 'c';

//ng generate service modules/aws/service/credentials/AwsCredentials
@Injectable({
  providedIn: AwsModule
})
export class AwsCredentialsService {
  credentials: AwsCredentialsModel;
  /*path: string;*/
  currentRegion: string;
  constructor() {
      /*this.path = process.cwd() + cred_file_location;
      //console.log('resources path');
      //console.log(storage);
      //console.log(storage.getDataPath());*/
  }

  setCurrentRegion(currentRegion: string): void {
      this.currentRegion = currentRegion;

  }
  async getCurrentRegion() {
      if (this.currentRegion != null) {
          return this.currentRegion;
      }
      return (await this.getCredentials()).defaultRegion;
  }
  async getCredentials(): Promise<AwsCredentialsModel> {
      if (this.credentials == null) {

          let cred_temp: AwsCredentialsModel = null;
          try {
              cred_temp = <AwsCredentialsModel>await this.getStorage(cred_key);
          }
          catch (err) {
              //console.log('err');
              //console.log(err);
          }
          if (cred_temp != null) {
              if(!cred_temp.accessKey && !cred_temp.secretKey){
                  this.credentials = null;
                  return this.credentials;
              }

              this.credentials = cred_temp;
          }
      }

      return this.credentials;
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

  async saveCredentials(accessKey: string, secretKey: string, defaultRegion: string, errcb: (err: any) => void, cb: () => void): Promise<void> {
      let t = this;
      let cred = new AwsCredentialsModel(accessKey, secretKey, defaultRegion);

      await this.setStorage(cred_key, cred);
      t.credentials = cred;
      cb();
  }

  async deleteCredentials(cb: () => void) {
      await this.removeStorage(cred_key);

  }

}
