import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosedElectivePageStudent } from './closed';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';

@NgModule({

    declarations: [ClosedElectivePageStudent],

    imports: [
        CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(ClosedElectivePageStudent)
    ],

})
export class ClosedElectiveModuleManagement { }  