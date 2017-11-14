import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPlannerPageManagement } from './new';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({

    declarations: [NewPlannerPageManagement],

    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewPlannerPageManagement)
    ],

})
export class NewPlannerModuleManagement { }  