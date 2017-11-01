import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluationTabsPageManagement } from './tab';

@NgModule({
  
    declarations: [EvaluationTabsPageManagement],
   
    imports: [
        IonicPageModule.forChild(EvaluationTabsPageManagement)
    ],
    
})
export class EvaluationTabModuleManagement { }  