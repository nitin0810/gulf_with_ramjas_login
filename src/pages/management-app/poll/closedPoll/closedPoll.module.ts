import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { ClosedPollPageManagement } from './closedPoll';


@NgModule({
  
    declarations: [ClosedPollPageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(ClosedPollPageManagement)
    ],
    
})
export class ClosedPollModuleManagement { }  