import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyTabsPageManagement } from './tabs';

@NgModule({
  
    declarations: [SurveyTabsPageManagement],
   
    imports: [
        IonicPageModule.forChild(SurveyTabsPageManagement)
    ],
    
})
export class SurveyTabModuleManagement { }  