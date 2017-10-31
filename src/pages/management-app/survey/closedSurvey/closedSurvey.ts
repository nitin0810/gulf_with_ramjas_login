import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { CurrentSurveyPageManagement } from '../currentSurvey/currentSurvey';
import { SurveyService } from '../../../../services/survey.service';

@IonicPage()
@Component({
    selector: 'closedSurvey',
    templateUrl: './closedSurvey.html',
    styles: [` `]
})

export class ClosedSurveyPageManagement extends CurrentSurveyPageManagement implements OnInit{

    title: string = "Survey (By Me)";

    constructor(
        public modalCtrl: ModalController,
        public surveyService: SurveyService,
        public customService: CustomService
    ) {
        super(modalCtrl, surveyService, customService);
        this.areSurveysExpired = true;
    }

    ngOnInit() {
        
        super.getSurveyList();
    }



}