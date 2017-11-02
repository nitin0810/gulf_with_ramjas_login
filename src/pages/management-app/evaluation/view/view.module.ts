import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';
import { ViewEvaluationPageManagement } from './view';
import { MomentModule } from 'angular2-moment';
import { ProgressbarModule } from '../../../../custom-components/progress-bar/progress-bar.module';

@NgModule({
  
    declarations: [ViewEvaluationPageManagement],
   
    imports: [
        CustomModalNavbarModule,
        MomentModule,
        ProgressbarModule,
        IonicPageModule.forChild(ViewEvaluationPageManagement)
    ],
    
})
export class ViewEvaluationModuleManagement { }  