import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SurveyListComponent } from './survey-list';
import { MomentModule } from 'angular2-moment';


@NgModule({

    declarations: [SurveyListComponent],

    imports: [
        MomentModule,
        IonicPageModule.forChild(SurveyListComponent)
    ],
    exports: [SurveyListComponent]

})
export class SurveyListModule { }  