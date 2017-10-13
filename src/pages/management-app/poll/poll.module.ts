import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollTabsManagement } from './poll';

@NgModule({
  
    declarations: [PollTabsManagement],
   
    imports: [
        IonicPageModule.forChild(PollTabsManagement)
    ],
    
})
export class PollModuleManagement { }  