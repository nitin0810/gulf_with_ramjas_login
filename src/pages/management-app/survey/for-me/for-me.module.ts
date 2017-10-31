import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { SurveyForMePageManagement } from './for-me';
import { SurveyListModule } from '../../../../custom-components/survey-list/survey-list.module';

@NgModule({

    declarations: [SurveyForMePageManagement],

    imports: [
        CustomNavbarModule,
        SurveyListModule,
        IonicPageModule.forChild(SurveyForMePageManagement)
    ],

})
export class SurveyForMeModuleManagement { }  