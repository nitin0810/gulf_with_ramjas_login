import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { ClosedSurveyPageManagement } from './closedSurvey';


@NgModule({
  
    declarations: [ClosedSurveyPageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(ClosedSurveyPageManagement)
    ],
    
})
export class ClosedSurveyModuleManagement { }  