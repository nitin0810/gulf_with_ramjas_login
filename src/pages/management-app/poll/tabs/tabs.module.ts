import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollTabsPageManagement } from './tabs';

@NgModule({
  
    declarations: [PollTabsPageManagement],
   
    imports: [
        IonicPageModule.forChild(PollTabsPageManagement)
    ],
    
})
export class PollTabModuleManagement { }  