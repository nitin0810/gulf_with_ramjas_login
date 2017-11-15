import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPlannerPageManagement } from './main';
import { NgCalendarModule } from 'ionic2-calendar';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({

    declarations: [MainPlannerPageManagement],

    imports: [
        CustomNavbarModule,
        NgCalendarModule,
        MomentModule,
        IonicPageModule.forChild(MainPlannerPageManagement)
    ],

})
export class MainPlannerModuleManagement { }  