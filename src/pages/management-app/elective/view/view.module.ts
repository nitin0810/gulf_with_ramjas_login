import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

import { ViewElectivePageManagement } from './view';
import { ProgressbarModule } from '../../../../custom-components/progress-bar/progress-bar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  
    declarations: [ViewElectivePageManagement],
   
    imports: [
        CustomModalNavbarModule,
        ProgressbarModule,
        MomentModule,
        IonicPageModule.forChild(ViewElectivePageManagement)
    ],
    
})
export class ViewElectiveModuleManagement { }  