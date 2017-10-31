import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { SurveyService } from '../../../services/survey.service';
import { CustomService } from '../../../services/custom.service';



@IonicPage()
@Component({
    selector: 'survey-student',
    templateUrl: './survey.html',
    styles: [` `]
})

export class SurveyPageStudent {

    title: string = "Survey";
    surveyList: Array<any>;
    pageNo: number = 1;

    constructor(
        public modalCtrl: ModalController,
        public surveyService: SurveyService,
        public customService: CustomService
    ) {
        this.getSurveys();
    }

    getSurveys(refresher?: any) {

        if (!refresher) { this.customService.showLoader(); }
        this.surveyService.fetchSurveysForStudent(1)
            .subscribe((res: any) => {

                this.surveyList = res;
                refresher ? refresher.complete() : this.customService.hideLoader();
            }, (err: any) => {

                refresher ? refresher.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    doRefresh(refresher) {

        this.getSurveys(refresher);
    }

    doInfinite(infinite) {

        this.surveyService.fetchSurveysForStudent( this.pageNo + 1)
            .subscribe((res: any) => {

                this.surveyList = this.surveyList.concat(res);
                infinite.complete();
            }, (err: any) => {

                infinite.complete();
                this.customService.showToast(err.msg);
            });
    }


}