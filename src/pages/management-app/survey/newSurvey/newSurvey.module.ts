import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewSurveyPageManagement } from './newSurvey';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [NewSurveyPageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewSurveyPageManagement)
    ],
    
})
export class NewSurveyModuleManagement { }  