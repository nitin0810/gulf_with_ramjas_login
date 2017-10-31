import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../custom-components/navbar/navbar.module';
import { SurveyPageStudent } from './survey';
import { SurveyListModule } from '../../../custom-components/survey-list/survey-list.module';


@NgModule({
  
    declarations: [SurveyPageStudent],
   
    imports: [
        CustomNavbarModule,
        SurveyListModule,
        IonicPageModule.forChild(SurveyPageStudent)
    ],
    
})
export class SurveyModuleStudent { }  