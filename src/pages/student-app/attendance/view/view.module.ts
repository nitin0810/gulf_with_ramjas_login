import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceViewPageStudent } from './view';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';
import { MomentModule } from 'angular2-moment';


@NgModule({

    declarations: [AttendanceViewPageStudent],

    imports: [
        CustomModalNavbarModule,
        MomentModule,
        IonicPageModule.forChild(AttendanceViewPageStudent)
    ],

})
export class AttendanceViewModuleStudent { }  