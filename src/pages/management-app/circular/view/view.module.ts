import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

import { ViewCircularPageManagement } from './view';
import { ProgressbarModule } from '../../../../custom-components/progress-bar/progress-bar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  
    declarations: [ViewCircularPageManagement],
   
    imports: [
        CustomModalNavbarModule,
        ProgressbarModule,
        MomentModule,
        IonicPageModule.forChild(ViewCircularPageManagement)
    ],
    
})
export class ViewCircularModuleManagement { }  