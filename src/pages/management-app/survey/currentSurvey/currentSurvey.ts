import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'currentSurvey',
    templateUrl: './currentSurvey.html',
    styles: [` `]
})

export class CurrentSurveyPageManagement {

    title: string = "Survey (By Me)";
}