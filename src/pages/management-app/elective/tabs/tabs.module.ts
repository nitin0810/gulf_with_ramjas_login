import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElectiveTabsPageManagement } from './tabs';

@NgModule({
  
    declarations: [ElectiveTabsPageManagement],
   
    imports: [
        IonicPageModule.forChild(ElectiveTabsPageManagement)
    ],
    
})
export class ElectiveTabModuleManagement { }  