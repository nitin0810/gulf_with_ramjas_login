import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'closedSurvey',
    templateUrl: './closedSurvey.html',
    styles: [` `]
})

export class ClosedSurveyPageManagement {

    title: string = "Survey (By Me)";
}