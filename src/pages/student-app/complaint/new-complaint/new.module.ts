import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NewComplaintPage } from './new';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
    declarations: [NewComplaintPage],

    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewComplaintPage)
    ],
})
export class NewComplaintModule{ }  