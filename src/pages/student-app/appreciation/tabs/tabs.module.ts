import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppreciationTabsPageStudent } from './tabs';


@NgModule({
  
    declarations: [AppreciationTabsPageStudent],
   
    imports: [
        IonicPageModule.forChild(AppreciationTabsPageStudent)
    ],
    
})
export class AppreciationTabModuleStudent { }  