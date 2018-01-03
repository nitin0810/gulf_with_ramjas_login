import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { NewAttendancePageManagement } from './new';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';


@NgModule({
  
    declarations: [NewAttendancePageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewAttendancePageManagement)
    ],
    
})
export class AttendanceNewModule { }  