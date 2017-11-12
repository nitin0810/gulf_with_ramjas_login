import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosedAssignmentPageStudent } from './closed';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({

    declarations: [ClosedAssignmentPageStudent],

    imports: [
        CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(ClosedAssignmentPageStudent)
    ],

})
export class ClosedAssignmentModuleManagement { }  