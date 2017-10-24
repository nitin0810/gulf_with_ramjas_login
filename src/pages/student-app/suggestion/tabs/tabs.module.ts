import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionTabsPageStudent } from './tabs';


@NgModule({
  
    declarations: [SuggestionTabsPageStudent],
   
    imports: [
        IonicPageModule.forChild(SuggestionTabsPageStudent)
    ],
    
})
export class SuggestionTabModuleStudent { }  