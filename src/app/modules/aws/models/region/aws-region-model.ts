//ng generate class modules/aws/models/region/AwsRegionModel
export class AwsRegionModel {
    constructor(public value:string, public name:string, public endpoint:string = ''){
        this.displayText = this.name +'  ('+this.value+' )';
    }
    public displayText:string;
}
