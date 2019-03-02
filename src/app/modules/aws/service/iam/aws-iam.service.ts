import * as AWS from 'aws-sdk';
import { Injectable, Inject } from '@angular/core';
import { AwsModule } from '../../aws.module';

import { AwsCredentialsService } from '../credentials/aws-credentials.service';

declare function unescape(s: string): string;
declare function escape(s: any): string;

export interface PolicyFullyLoaded {
    Policy?: AWS.IAM.Policy,
    PolicyVersion?: AWS.IAM.PolicyVersion
    PolicyVersionDocument?: any
}

export interface AssumeRolePolicyDocument {
    Version: string,
    Statement: AssumeRolePolicyStatement[]
}

export interface AssumeRolePolicyStatement {
    Effect: string,
    Principal: AssumeRolePrincipal,
    Action: string
}

export interface AssumeRolePrincipal {
    AWS?: string,
    Service?: string
}

export interface GroupInlinePolicyDocument {
    Version: string,
    Statement: GroupInlinePolicyStatement[]
}

export interface GroupInlinePolicyStatement {
    Effect: string,
    Resource: string,
    Action: string
}

@Injectable({
  providedIn: AwsModule
})
export class AwsIamService {
  private iam: AWS.IAM;

  constructor(
      private credService: AwsCredentialsService,
      @Inject('aws_config') private config: AWS.IAM.ClientConfiguration) {
          //console.log('constructing iam service', config.accessKeyId, config.secretAccessKey);
      this.iam = new AWS.IAM(config);
      //console.log('IAM SERVICE', config);
  }

  /** gets all users */
  public ListUsers(): Promise<AWS.IAM.ListUsersResponse> {
      return new Promise((resolve, reject) => {
          this.iam.listUsers((err, data) => {
              if (err) {
                  reject(err);
              } else {
                  //console.log("FROGTOWN",data,err);
                  data.Users.sort((userA, userB) => userA.Path.localeCompare(userB.Path));
                  resolve(data);
              }
          });
      });
  }

  /** gets all groups */
  public ListGroups(): Promise<AWS.IAM.ListGroupsResponse> {
      return new Promise((resolve, reject) => {
          this.iam.listGroups((err, data) => {
              resolve(data);
          });
      });
  }

  /** gets all groups for a given user */
  public ListGroupsForUser(username: string): Promise<AWS.IAM.ListGroupsForUserResponse> {
      let model: AWS.IAM.ListGroupsForUserRequest = {
          UserName: username
      };
      return new Promise((resolve, reject) => {
          this.iam.listGroupsForUser(model, (err, data) => {
              resolve(data);
          });
      });
  }

  public CreateGroup(groupName: string): Promise<AWS.IAM.CreateGroupResponse> {
      let model: AWS.IAM.CreateGroupRequest = {
          GroupName: groupName
      };
      return new Promise((resolve, reject) => {
          this.iam.createGroup(model, (err, data) => {
              resolve(data);
          });
      });
  }

  public GetGroup(groupName: string): Promise<AWS.IAM.GetGroupResponse> {
      let model: AWS.IAM.GetGroupRequest = {
          GroupName: groupName
      };
      return new Promise((resolve, reject) => {
          this.iam.getGroup(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /** gets all roles */
  public ListRoles(): Promise<AWS.IAM.ListRolesResponse> {
      return new Promise((resolve, reject) => {
          this.iam.listRoles((err, data) => {
              resolve(data);
          });
      });
  }

  public GetRole(roleName: string): Promise<AWS.IAM.GetRoleResponse> {
      let model: AWS.IAM.GetRoleRequest = {
          RoleName: roleName
      };
      return new Promise((resolve, reject) => {
          this.iam.getRole(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /** gets an individual policy */
  public getPolicy(policyArn: string): Promise<AWS.IAM.GetPolicyResponse> {
      let model: AWS.IAM.GetPolicyRequest = {
          PolicyArn: policyArn
      };
      return new Promise((resolve, reject) => {
          this.iam.getPolicy(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /** gets the entity that contains the json document for the given policy */
  public getPolicyVersion(policyArn: string, policyVersion: string): Promise<AWS.IAM.GetPolicyVersionResponse> {
      let model: AWS.IAM.GetPolicyVersionRequest = {
          PolicyArn: policyArn,
          VersionId: policyVersion
      };
      return new Promise((resolve, reject) => {
          this.iam.getPolicyVersion(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /*
      get inline policies for User
  */
  public getUserPolicies(username: string): Promise<AWS.IAM.ListUserPoliciesResponse> {
      let model: AWS.IAM.ListUserPoliciesRequest = {
          UserName: username
      };
      return new Promise((resolve, reject) => {
          this.iam.listUserPolicies(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /*
      get inline policies for Group
  */
  public getGroupPolicies(groupName: string): Promise<AWS.IAM.ListGroupPoliciesResponse> {
      let model: AWS.IAM.ListGroupPoliciesRequest = {
          GroupName: groupName
      };
      return new Promise((resolve, reject) => {
          this.iam.listGroupPolicies(model, (err, data) => {
              resolve(data);
          });
      });
  }

  public getGroupPolicy(groupName: string, policyName: string): Promise<AWS.IAM.GetGroupPolicyResponse> {
      let model: AWS.IAM.GetGroupPolicyRequest = {
          GroupName: groupName,
          PolicyName: policyName
      };
      return new Promise((resolve, reject) => {
          this.iam.getGroupPolicy(model, (err, data) => {
              if (err) {
                  reject(err);
              }
              else {
                  resolve(data);
              }
          });
      });
  }

  public addGroupInlinePolicy(groupName: string, policyName: string, policyDocument: GroupInlinePolicyDocument): Promise<boolean> {
      let model: AWS.IAM.PutGroupPolicyRequest = {
          GroupName: groupName,
          PolicyName: policyName,
          PolicyDocument: JSON.stringify(policyDocument)
      }
      return new Promise((resolve, reject) => {
          this.iam.putGroupPolicy(model, (err, data) => {
              if (err) {
                  reject(err);
              }
              else {
                  resolve(true);
              }
          });
      });
  }

  /*
      get inline policies for Role
  */
  public getRolePolicies(roleName: string): Promise<AWS.IAM.ListRolePoliciesResponse> {
      let model: AWS.IAM.ListRolePoliciesRequest = {
          RoleName: roleName
      };
      return new Promise((resolve, reject) => {
          this.iam.listRolePolicies(model, (err, data) => {
              resolve(data);
          });
      });
  }


  /** Gets all of the policies (permission sets) associated with the user */
  public listAttachedUserPolicies(username: string): Promise<AWS.IAM.ListAttachedUserPoliciesResponse> {
      let model: AWS.IAM.ListAttachedUserPoliciesRequest = {
          UserName: username
      };
      return new Promise((resolve, reject) => {
          this.iam.listAttachedUserPolicies(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /** Gets all of the policies (permission sets) associated with the Group */
  public listAttachedGroupPolicies(groupName: string): Promise<AWS.IAM.ListAttachedGroupPoliciesResponse> {
      let model: AWS.IAM.ListAttachedGroupPoliciesRequest = {
          GroupName: groupName
      };
      return new Promise((resolve, reject) => {
          this.iam.listAttachedGroupPolicies(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /** Gets all of the policies (permission sets) associated with the Role */
  public listAttachedRolePolicies(roleName: string): Promise<AWS.IAM.ListAttachedRolePoliciesResponse> {
      let model: AWS.IAM.ListAttachedRolePoliciesRequest = {
          RoleName: roleName
      };
      return new Promise((resolve, reject) => {
          this.iam.listAttachedRolePolicies(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /** Gets all inline policies for a given role */
  public listRolePolicies(roleName: string): Promise<AWS.IAM.ListRolePoliciesResponse> {
      let model: AWS.IAM.ListRolePoliciesRequest = {
          RoleName: roleName
      };
      return new Promise((resolve, reject) => {
          this.iam.listRolePolicies(model, (err, data) => {
              resolve(data);
          });
      });
  }

  public getRolePolicy(roleName: string, policyName: string): Promise<AWS.IAM.GetRolePolicyResponse> {
      let model: AWS.IAM.GetRolePolicyRequest = {
          RoleName: roleName,
          PolicyName: policyName
      };
      return new Promise((resolve, reject) => {
          this.iam.getRolePolicy(model, (err, data) => {
              resolve(data);
          });
      });
  }

  /** Scope can be: null, "All" "AWS" "Local" */
  public listPolicies(scope: string, maxItems: number = 5000): Promise<AWS.IAM.ListPoliciesResponse> {
      let model: AWS.IAM.ListPoliciesRequest = {
          Scope: scope
      }
      return new Promise((resolve, reject) => {
          this.iam.listPolicies(model, (err, data) => {
              resolve(data);
          });
      });
  }

  public listEntitiesForPolicy(policyArn: string): Promise<AWS.IAM.ListEntitiesForPolicyResponse> {
      let model: AWS.IAM.ListEntitiesForPolicyRequest = {
          PolicyArn: policyArn
      };
      return new Promise((resolve, reject) => {
          this.iam.listEntitiesForPolicy(model, (err, data) => {
              resolve(data);
          });
      });
  }


  public async loadFullPolicyInfo(policyArn: string): Promise<PolicyFullyLoaded> {
      return new Promise(async (resolve, reject) => {
          let policyResponse = await this.getPolicy(policyArn);
          let policyVersionResponse = await this.getPolicyVersion(policyArn, policyResponse.Policy.DefaultVersionId);
          let policyDocument = JSON.parse(unescape(policyVersionResponse.PolicyVersion.Document));

          let loadedPolicy: PolicyFullyLoaded = {
              Policy: policyResponse.Policy,
              PolicyVersion: policyVersionResponse.PolicyVersion,
              PolicyVersionDocument: policyDocument
          };

          resolve(loadedPolicy);
      });
  }

  public parsePolicyDocument(policyDocument: string): any {
      return JSON.parse(unescape(policyDocument));
  }

  public async updatePolicy(policyArn: string, policyDocument: any): Promise<AWS.IAM.CreatePolicyVersionResponse> {
      let model: AWS.IAM.CreatePolicyVersionRequest = {
          PolicyArn: policyArn,
          PolicyDocument: JSON.stringify(policyDocument),
          SetAsDefault: true
      };
      return new Promise((resolve, reject) => {
          this.iam.createPolicyVersion(model, (err, data) => {
              resolve(data);
          });
      });
  }

  public async createPolicy(policyName: string, policyDocument: any, description: string = null, path: string = '/'): Promise<AWS.IAM.CreatePolicyResponse> {
      let model: AWS.IAM.CreatePolicyRequest = {
          PolicyDocument: JSON.stringify(policyDocument),
          PolicyName: policyName,
          Description: description,
          Path: path
      };
      return new Promise((resolve, reject) => {
          this.iam.createPolicy(model, (err, data) => {
              if (err) {
                  reject(err);
              }
              else {
                  resolve(data);
              }
          });
      });
  }

  public async createRole(description: string, roleName: string, assumeRolePolicyDocument: any): Promise<AWS.IAM.CreateRoleResponse> {
      let model: AWS.IAM.CreateRoleRequest = {
          RoleName: roleName,
          Description: description,
          AssumeRolePolicyDocument: JSON.stringify(assumeRolePolicyDocument),
      };
      return new Promise<AWS.IAM.CreateRoleResponse>((resolve, reject) => {
          this.iam.createRole(model, (err, data) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(data);
              }
          });
      });
  }

  public async attachRolePolicy(roleName: string, policyArn: string): Promise<any> {
      let model: AWS.IAM.AttachRolePolicyRequest = {
          PolicyArn: policyArn,
          RoleName: roleName
      };
      return new Promise((resolve, reject) => {
          this.iam.attachRolePolicy(model, (err, data) => {
              resolve(data);
          });
      });
  }

  public getStatementsFromAssumeRolePolicy(role: AWS.IAM.Role): AssumeRolePolicyStatement[] {
      let policyDoc: any = this.parsePolicyDocument(role.AssumeRolePolicyDocument);
      let returnValue: AssumeRolePolicyStatement[] = [];
      //console.log(policyDoc);
      if (policyDoc && policyDoc.Statement instanceof Array) {
          //console.log('its an array');
          //traverse the array, find accounts, find non accounts, and add them to their respective collections
          policyDoc.Statement.forEach(pd => {
              var convertedValue = this.convertToAssumeRolePolicyStatement(pd);
              if (convertedValue) {
                  returnValue.push(convertedValue);
              }
          });
      }
      else if (policyDoc && policyDoc.Statement) {
          //if it's not an array then it's an object
          //console.log('its a solid');
          var convertedValue = this.convertToAssumeRolePolicyStatement(policyDoc.statement);
          if (convertedValue) {
              returnValue.push(convertedValue);
          }
      }

      return returnValue;
  }

  private convertToAssumeRolePolicyStatement(value: any) {
      return <AssumeRolePolicyStatement>value;
  }

  public statementIsAllowAccountToAssumeRole(arps: AssumeRolePolicyStatement): boolean {
      var accountNumber = this.getAccountNumberFromArpsArn(arps);
      if (accountNumber) {
          return true;
      }
      return false;
  }

  public getAccountNumberFromArpsArn(arps: AssumeRolePolicyStatement): string {
      if (arps && arps.Action == "sts:AssumeRole" && arps.Effect == "Allow" && arps.Principal && arps.Principal.AWS) {
          if (arps.Principal.AWS.startsWith("arn:aws:iam::")
              && arps.Principal.AWS.endsWith(":root")) {
              var ss = arps.Principal.AWS.substring(13);
              var ssArray = ss.split(':');
              if (ssArray[0]) {
                  return ssArray[0];
              }
          }
      }
      return null;
  }

  public updateRoleTrustPolicy(role: AWS.IAM.Role, trustPolicies: AssumeRolePolicyStatement[]): Promise<boolean> {
      //console.log('running update');

      let statement: any = JSON.parse(unescape(role.AssumeRolePolicyDocument));
      statement.Statement = trustPolicies;

      var model: AWS.IAM.UpdateAssumeRolePolicyRequest = {
          RoleName: role.RoleName,
          PolicyDocument: JSON.stringify(statement)
      };

      console.log(model);
      
      return new Promise((resolve, reject) => {
          this.iam.updateAssumeRolePolicy(model, (err, data) => {
              if (err) {
                  console.log('error', err);
                  reject(err);
              }
              else {
                  role.AssumeRolePolicyDocument = JSON.stringify(statement);
                  resolve(true);
              }
          });
      });
  }

  public generateGenericAssumeRolePolicyDocument(): AssumeRolePolicyDocument {
      return {
          Version: '2012-10-17',
          Statement: []
      }
  }

  public stringifyObject(objToStringify: any): string {
      return JSON.stringify(objToStringify);
  }
}
