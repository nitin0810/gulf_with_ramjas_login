import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignmentTabsPageStudent } from './tabs';

@NgModule({

    declarations: [AssignmentTabsPageStudent],

    imports: [
        IonicPageModule.forChild(AssignmentTabsPageStudent)
    ],

})
export class AssignmentTabModuleStudent { }  