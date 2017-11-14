import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPlannerPageManagement } from './main';
import { NgCalendarModule } from 'ionic2-calendar';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';

@NgModule({

    declarations: [MainPlannerPageManagement],

    imports: [
        CustomNavbarModule,
        NgCalendarModule,
        IonicPageModule.forChild(MainPlannerPageManagement)
    ],

})
export class MainPlannerModuleManagement { }  