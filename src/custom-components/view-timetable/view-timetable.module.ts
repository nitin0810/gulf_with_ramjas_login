import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeTableViewPage } from './view-timetable';
import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [TimeTableViewPage],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(TimeTableViewPage)
    ],
    
})
export class TimeTableViewModule { }  