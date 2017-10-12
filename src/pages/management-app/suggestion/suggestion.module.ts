import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionTabsManagement } from './suggestion';


@NgModule({
  
    declarations: [SuggestionTabsManagement],
   
    imports: [
        IonicPageModule.forChild(SuggestionTabsManagement)
    ],
    
})
export class SuggestionModuleStudent { }  