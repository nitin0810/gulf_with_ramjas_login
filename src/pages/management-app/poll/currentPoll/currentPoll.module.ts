import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { CurrentPollPageManagement } from './currentPoll';


@NgModule({
  
    declarations: [CurrentPollPageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(CurrentPollPageManagement)
    ],
    
})
export class CurrentPollModuleManagement { }  