import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignmentTabsPageManagement } from './tabs';

@NgModule({

    declarations: [AssignmentTabsPageManagement],

    imports: [
        IonicPageModule.forChild(AssignmentTabsPageManagement)
    ],

})
export class AssignmentTabModuleManagement { }  