import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentAssignmentPageManagement } from './current';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';

@NgModule({

    declarations: [CurrentAssignmentPageManagement],

    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(CurrentAssignmentPageManagement)
    ],

})
export class CurrentAssignmentModuleManagement { }  