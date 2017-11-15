import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimelinePageManagement } from './timeLine';
import { MomentModule } from 'angular2-moment';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({

    declarations: [TimelinePageManagement],

    imports: [
        CustomModalNavbarModule,
        MomentModule,
        IonicPageModule.forChild(TimelinePageManagement)
    ],

})
export class MainPlannerModuleManagement { }  