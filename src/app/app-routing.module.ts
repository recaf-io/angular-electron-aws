import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//import { AwsModule } from './modules/aws/aws.module';
import { AwsCredentialsComponent } from './modules/awsui/components/aws.credentials/aws.credentials.component';
import {SqsMessageSenderComponent} from './modules/blog-sqs-lambda-angular/components/sqs-message-sender/sqs-message-sender.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'credentials',
        component: AwsCredentialsComponent
    },
    {
        path: 'sqs-message-sender',
        component: SqsMessageSenderComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
