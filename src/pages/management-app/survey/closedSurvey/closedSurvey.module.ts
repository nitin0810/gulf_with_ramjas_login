import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { ClosedSurveyPageManagement } from './closedSurvey';
import { SurveyListModule } from '../../../../custom-components/survey-list/survey-list.module';


@NgModule({
  
    declarations: [ClosedSurveyPageManagement],
   
    imports: [
        CustomNavbarModule,
        SurveyListModule,
        IonicPageModule.forChild(ClosedSurveyPageManagement)
    ],
    
})
export class ClosedSurveyModuleManagement { }  