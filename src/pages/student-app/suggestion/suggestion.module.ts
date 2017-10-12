import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionTabsStudent } from './suggestion';


@NgModule({
  
    declarations: [SuggestionTabsStudent],
   
    imports: [
        IonicPageModule.forChild(SuggestionTabsStudent)
    ],
    
})
export class SuggestionModuleStudent { }  