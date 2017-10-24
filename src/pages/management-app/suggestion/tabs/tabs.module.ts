import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionTabsPageManagement } from './tabs';


@NgModule({
  
    declarations: [SuggestionTabsPageManagement],
   
    imports: [
        IonicPageModule.forChild(SuggestionTabsPageManagement)
    ],
    
})
export class SuggestionTabModuleManagement { }  