import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// import { MomentModule } from 'angular2-moment';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { TimeTablePageManagement } from './main';

@NgModule({
  
    declarations: [TimeTablePageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(TimeTablePageManagement)
    ],
    
})
export class TimeTableModuleManagement { }  