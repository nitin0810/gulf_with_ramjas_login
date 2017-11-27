import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssessmentTabsPageStudent } from './tabs';


@NgModule({

    declarations: [AssessmentTabsPageStudent],

    imports: [
        IonicPageModule.forChild(AssessmentTabsPageStudent)
    ],

})
export class AssessmentTabModuleStudent { }  