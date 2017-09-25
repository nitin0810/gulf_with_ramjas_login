import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../../../custom-components/modal-navbar/modal-navbar.module';
import { MomentModule } from 'angular2-moment';

import { ViewComplaintPage } from './view';

@NgModule({
    declarations: [ViewComplaintPage],

    imports: [
        CustomModalNavbarModule,
        MomentModule,
        IonicPageModule.forChild(ViewComplaintPage)
    ],
})
export class ComplaintModule { }  