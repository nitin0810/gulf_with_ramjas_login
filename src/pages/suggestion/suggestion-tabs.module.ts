import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionTabs } from './suggestion-tabs';


@NgModule({
  
    declarations: [SuggestionTabs],
   
    imports: [
        IonicPageModule.forChild(SuggestionTabs)
    ],
    
})
export class SuggestionModule { }  