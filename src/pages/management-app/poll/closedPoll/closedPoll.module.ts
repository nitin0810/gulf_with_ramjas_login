import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { ClosedPollPageManagement } from './closedPoll';
import { ListPollModuleManagement } from '../list/list.module';


@NgModule({
  
    declarations: [ClosedPollPageManagement],
   
    imports: [
        CustomNavbarModule,
        ListPollModuleManagement,
        IonicPageModule.forChild(ClosedPollPageManagement)
    ],
    
})
export class ClosedPollModuleManagement { }  