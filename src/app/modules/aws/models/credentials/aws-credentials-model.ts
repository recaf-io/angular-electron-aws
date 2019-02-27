//ng generate class modules/aws/models/credentials/AwsCredentialsModel
export class AwsCredentialsModel {
    constructor( public accessKey:string, public secretKey:string, public defaultRegion:string ){

    }
}
