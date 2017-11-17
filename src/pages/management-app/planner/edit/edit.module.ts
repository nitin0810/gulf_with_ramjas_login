import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPlannerPageManagement } from './edit';
import { MomentModule } from 'angular2-moment';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({

    declarations: [EditPlannerPageManagement],

    imports: [
        CustomModalNavbarModule,
        MomentModule,
        IonicPageModule.forChild(EditPlannerPageManagement)
    ],

})
export class EditPlannerModuleManagement { }  