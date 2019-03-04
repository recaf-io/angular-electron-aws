import * as AWS from 'aws-sdk';
import { Injectable, Inject } from '@angular/core';
import { AwsModule } from '../../aws.module';

import { AwsCredentialsService } from '../credentials/aws-credentials.service';
import { debug } from 'util';

@Injectable({
    providedIn: AwsModule
})
export class AwsStsService {
    private securityTokenService: AWS.STS;

    constructor(private credentialsService: AwsCredentialsService) { }

    private async runSetup() {
        if (this.securityTokenService) {
            return this.securityTokenService;
        } else {
            let credentials = await this.credentialsService.getCredentials();
            let config: AWS.STS.ClientConfiguration = {
                accessKeyId: credentials.accessKey,
                secretAccessKey: credentials.secretKey,
                region: credentials.defaultRegion
            }
            this.securityTokenService = new AWS.STS(config);
        }

    }

    public async GetMyIdentity(): Promise<AWS.STS.GetCallerIdentityResponse> {
        await this.runSetup();
        let request: AWS.STS.GetCallerIdentityRequest = {

        };
        return new Promise((resolve, reject) => {
            this.securityTokenService.getCallerIdentity(request, (err, data) => {
                debugger;
                resolve(data);
            });
        });
    }

    public async CreateNewAssumeRoleAccount(accountSessionName: string, roleArn: string, durationInSeconds: number): Promise<AWS.STS.AssumeRoleResponse> {
        await this.runSetup();
        let request: AWS.STS.AssumeRoleRequest = {
            RoleArn: roleArn,
            RoleSessionName: accountSessionName,
            DurationSeconds: durationInSeconds
        };
        return new Promise((resolve, reject) => {
            this.securityTokenService.assumeRole(request, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    public async CreateAssumeRoleInOtherAccount(accountName: string, accountId: string, roleName: string, durationInSeconds: number): Promise<AWS.STS.AssumeRoleResponse> {
        await this.runSetup();
        let roleArn: string = "arn:aws:iam::" + accountId + ":role/" + roleName;
        let request: AWS.STS.AssumeRoleRequest = {
            RoleArn: roleArn,
            RoleSessionName: accountName,
            DurationSeconds: durationInSeconds
        };
        return new Promise((resolve, reject) => {
            this.securityTokenService.assumeRole(request, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
