import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElectiveTabsPageStudent } from './tabs';

@NgModule({

    declarations: [ElectiveTabsPageStudent],

    imports: [
        IonicPageModule.forChild(ElectiveTabsPageStudent)
    ],

})
export class ElectiveTabModuleStudent { }  