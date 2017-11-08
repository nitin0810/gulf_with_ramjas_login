import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosedAssignmentPageManagement } from './closed';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';

@NgModule({

    declarations: [ClosedAssignmentPageManagement],

    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(ClosedAssignmentPageManagement)
    ],

})
export class ClosedAssignmentModuleManagement { }  