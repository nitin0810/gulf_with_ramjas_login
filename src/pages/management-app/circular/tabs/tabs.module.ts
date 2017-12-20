import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CircularTabsPageManagement } from './tabs';

@NgModule({
  
    declarations: [CircularTabsPageManagement],
   
    imports: [
        IonicPageModule.forChild(CircularTabsPageManagement)
    ],
    
})
export class CircularTabModuleManagement { }  