import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { TimeTablePageManagement } from './main';

@NgModule({
  
    declarations: [TimeTablePageManagement],
   
    imports: [
        MomentModule,
        IonicPageModule.forChild(TimeTablePageManagement)
    ],
    
})
export class TimeTableModuleManagement { }  