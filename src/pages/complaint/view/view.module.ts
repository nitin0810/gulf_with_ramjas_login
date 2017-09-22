import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../../../custom-components/modal-navbar/modal-navbar.module';

import { ViewComplaintPage } from './view';

@NgModule({
    declarations: [ViewComplaintPage],

    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(ViewComplaintPage)
    ],
})
export class ComplaintModule { }  