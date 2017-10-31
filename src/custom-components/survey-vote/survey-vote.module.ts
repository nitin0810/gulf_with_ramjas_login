import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MomentModule } from 'angular2-moment';
import { SurveyVoteComponent } from './survey-vote';
import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';


@NgModule({

    declarations: [SurveyVoteComponent],

    imports: [
        MomentModule,
        CustomModalNavbarModule,
        IonicPageModule.forChild(SurveyVoteComponent)
    ],
    exports: [SurveyVoteComponent]

})
export class SurveyVoteModule { }  