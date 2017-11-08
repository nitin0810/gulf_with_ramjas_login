import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAssignmentPageManagement } from './new';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({

    declarations: [NewAssignmentPageManagement],

    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewAssignmentPageManagement)
    ],

})
export class NewAssignmentModuleManagement { }  