import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppreciationTabsPageManagement } from './tabs';


@NgModule({
  
    declarations: [AppreciationTabsPageManagement],
   
    imports: [
        IonicPageModule.forChild(AppreciationTabsPageManagement)
    ],
    
})
export class AppreciationTabModuleManagement { }  