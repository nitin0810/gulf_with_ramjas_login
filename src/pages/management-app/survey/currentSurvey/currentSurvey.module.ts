import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { CurrentSurveyPageManagement } from './currentSurvey';


@NgModule({
  
    declarations: [CurrentSurveyPageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(CurrentSurveyPageManagement)
    ],
    
})
export class CurrentSurveyModuleManagement { }  