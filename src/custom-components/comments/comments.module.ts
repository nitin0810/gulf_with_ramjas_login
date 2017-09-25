import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';

import { CommentsPage } from './comments';

@NgModule({
    declarations: [CommentsPage],

    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(CommentsPage)
    ],

})
export class CommentsModule { }