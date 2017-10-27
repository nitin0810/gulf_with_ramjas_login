import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { PollForMePageManagement } from './for-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [PollForMePageManagement],
   
    imports: [
        MomentModule,
        CustomNavbarModule,
        IonicPageModule.forChild(PollForMePageManagement)
    ],
    exports:[PollForMePageManagement]
    
})
export class PollForMeModuleManagement { }  