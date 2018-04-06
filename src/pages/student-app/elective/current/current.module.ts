import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentElectivePageStudent } from './current';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({

    declarations: [CurrentElectivePageStudent],

    imports: [
        CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(CurrentElectivePageStudent)
    ],

})
export class CurrentElectiveModuleStudent { }  