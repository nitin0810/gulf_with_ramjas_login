import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentAssignmentPageManagement } from './current';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({

    declarations: [CurrentAssignmentPageManagement],

    imports: [
        CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(CurrentAssignmentPageManagement)
    ],

})
export class CurrentAssignmentModuleManagement { }  