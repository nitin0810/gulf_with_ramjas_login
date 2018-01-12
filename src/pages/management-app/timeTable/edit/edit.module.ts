import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// import { MomentModule } from 'angular2-moment';
import { TimeTableEditPageManagement } from './edit';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [TimeTableEditPageManagement],
   
    imports: [
        // MomentModule,
        CustomModalNavbarModule,
        IonicPageModule.forChild(TimeTableEditPageManagement)
    ],
    
})
export class TimeTabledEditModuleManagement { }  