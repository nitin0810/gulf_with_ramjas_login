import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// import { MomentModule } from 'angular2-moment';
import { EditAttendancePageManagement } from './edit';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [EditAttendancePageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(EditAttendancePageManagement)
    ],
    
})
export class EditAttendanceModuleManagement { }  