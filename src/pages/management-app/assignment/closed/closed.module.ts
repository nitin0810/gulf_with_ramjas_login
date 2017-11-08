import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosedAssignmentPageManagement } from './closed';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({

    declarations: [ClosedAssignmentPageManagement],

    imports: [
        CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(ClosedAssignmentPageManagement)
    ],

})
export class ClosedAssignmentModuleManagement { }  