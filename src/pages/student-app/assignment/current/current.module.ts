import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentAssignmentPageStudent } from './current';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({

    declarations: [CurrentAssignmentPageStudent],

    imports: [
        CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(CurrentAssignmentPageStudent)
    ],

})
export class CurrentAssignmentModuleStudent { }  