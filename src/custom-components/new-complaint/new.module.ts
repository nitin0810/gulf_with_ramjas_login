import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';
import { NewComplaintPage } from './new';

@NgModule({
    declarations: [NewComplaintPage],

    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewComplaintPage)
    ],
})
export class NewComplaintModule{ }  