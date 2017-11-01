import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { LecturerEvaluationPageManagement } from './lecturer';

@NgModule({
  
    declarations: [LecturerEvaluationPageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(LecturerEvaluationPageManagement)
    ],
    
})
export class LecturerEvaluationModuleManagement { }  