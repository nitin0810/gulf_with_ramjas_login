import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { CurrentSurveyPageManagement } from './currentSurvey';
import { SurveyListModule } from '../../../../custom-components/survey-list/survey-list.module';


@NgModule({
  
    declarations: [CurrentSurveyPageManagement],
   
    imports: [
        CustomNavbarModule,
        SurveyListModule,
        IonicPageModule.forChild(CurrentSurveyPageManagement)
    ],
    
})
export class CurrentSurveyModuleManagement { }  