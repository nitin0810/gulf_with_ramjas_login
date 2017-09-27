import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';
import { MomentModule } from 'angular2-moment';

import { CommentsPage } from './comments';

@NgModule({
    declarations: [CommentsPage],

    imports: [
        CustomModalNavbarModule,
        MomentModule,
        IonicPageModule.forChild(CommentsPage)
    ],

})
export class CommentsModule { }