import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssessmentViewPageManagement } from './view';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';


@NgModule({

    declarations: [AssessmentViewPageManagement],

    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(AssessmentViewPageManagement)
    ],

})
export class AssessmentTabModuleManagement { }  