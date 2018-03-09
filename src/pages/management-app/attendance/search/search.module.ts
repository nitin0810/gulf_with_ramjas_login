import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { SearchAttendancePageManagement } from './search';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';


@NgModule({
  
    declarations: [SearchAttendancePageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(SearchAttendancePageManagement)
    ],
    
})
export class AttendanceSearchModule { }  