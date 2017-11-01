import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEvaluationPageManagement } from './new';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [NewEvaluationPageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewEvaluationPageManagement)
    ],
    
})
export class NewEvaluationModuleManagement { }  