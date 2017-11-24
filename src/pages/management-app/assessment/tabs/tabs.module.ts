import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssessmentTabsPageManagement } from './tabs';


@NgModule({

    declarations: [AssessmentTabsPageManagement],

    imports: [
        IonicPageModule.forChild(AssessmentTabsPageManagement)
    ],

})
export class AssessmentTabModuleManagement { }  