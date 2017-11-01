import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuleEvaluationPageManagement } from './module';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';

@NgModule({
  
    declarations: [ModuleEvaluationPageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(ModuleEvaluationPageManagement)
    ],
    
})
export class ModuleEvaluationModuleManagement { }  