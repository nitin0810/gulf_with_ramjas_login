import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPlannerPageManagement } from './view';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({

    declarations: [ViewPlannerPageManagement],

    imports: [
        CustomModalNavbarModule,
        MomentModule,
        IonicPageModule.forChild(ViewPlannerPageManagement)
    ],

})
export class ViewPlannerModuleManagement { }  