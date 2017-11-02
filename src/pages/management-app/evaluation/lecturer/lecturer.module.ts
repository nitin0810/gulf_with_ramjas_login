import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { LecturerEvaluationPageManagement } from './lecturer';
import { MomentModule } from 'angular2-moment';

@NgModule({
  
    declarations: [LecturerEvaluationPageManagement],
   
    imports: [
        // CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(LecturerEvaluationPageManagement)
    ],
    
})
export class LecturerEvaluationModuleManagement { }  