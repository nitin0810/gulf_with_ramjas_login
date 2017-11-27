import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssessmentViewPageStudent } from './view';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';
import { MomentModule } from 'angular2-moment';


@NgModule({

    declarations: [AssessmentViewPageStudent],

    imports: [
        CustomModalNavbarModule,
        MomentModule,
        IonicPageModule.forChild(AssessmentViewPageStudent)
    ],

})
export class AssessmentViewModuleStudent { }  