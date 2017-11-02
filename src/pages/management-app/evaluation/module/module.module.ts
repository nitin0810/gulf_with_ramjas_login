import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuleEvaluationPageManagement } from './module';
import { MomentModule } from 'angular2-moment';
// import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';

@NgModule({
  
    declarations: [ModuleEvaluationPageManagement],
   
    imports: [
        // CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(ModuleEvaluationPageManagement)
    ],
    
})
export class ModuleEvaluationModuleManagement { }  