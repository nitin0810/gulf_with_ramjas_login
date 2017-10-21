import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { CurrentPollPageManagement } from './currentPoll';
import { ListPollModuleManagement } from '../list/list.module';


@NgModule({
  
    declarations: [CurrentPollPageManagement],
   
    imports: [
        CustomNavbarModule,
        ListPollModuleManagement,
        IonicPageModule.forChild(CurrentPollPageManagement)
    ],
    
})
export class CurrentPollModuleManagement { }  