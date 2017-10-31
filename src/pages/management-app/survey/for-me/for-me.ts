import { CustomService } from '../../../../services/custom.service';
import { SurveyService } from '../../../../services/survey.service';
import { ModalController,IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
    selector: 'survey-for-me',
    templateUrl: './for-me.html',
    styles: [` `]
})

export class SurveyForMePageManagement {

    title: string = "Survey (For Me)";
surveyList:Array<any>;
    constructor(
        public modalCtrl: ModalController,
        public surveyService: SurveyService,
        public customService: CustomService
    ) {
    }

    doRefresh(refresher){}

    doInfinite(infinite){}
}