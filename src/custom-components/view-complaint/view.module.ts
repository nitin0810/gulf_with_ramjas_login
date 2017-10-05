import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

import { ViewComplaintPage } from './view';
import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';

@NgModule({
    declarations: [ViewComplaintPage],

    imports: [
        CustomModalNavbarModule,
        MomentModule,
        IonicPageModule.forChild(ViewComplaintPage)
    ],
})
export class ViewComplaintModule { }  