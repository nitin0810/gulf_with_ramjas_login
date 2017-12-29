import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { TimeTablePageStudent } from './main';

@NgModule({
  
    declarations: [TimeTablePageStudent],
   
    imports: [
        MomentModule,
        IonicPageModule.forChild(TimeTablePageStudent)
    ],
    
})
export class TimeTableModuleStudent { }  