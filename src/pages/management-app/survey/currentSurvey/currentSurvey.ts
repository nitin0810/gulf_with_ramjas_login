import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { SurveyService } from '../../../../services/survey.service';

@IonicPage()
@Component({
    selector: 'currentSurvey',
    templateUrl: './currentSurvey.html',
    styles: [` `]
})

export class CurrentSurveyPageManagement implements OnInit {

    title: string = "Survey (By Me)";
    surveyList: Array<any>;
    pageNo: number = 1;

    areSurveysExpired: boolean = false;
    constructor(
        public modalCtrl: ModalController,
        public surveyService: SurveyService,
        public customService: CustomService
    ) {
    };

    ngOnInit() {

        this.getSurveyList();
    }

    getSurveyList(refresher?: any) {

        if (!refresher) { this.customService.showLoader(); }
        this.surveyService.fetchSurveysForManagement(this.areSurveysExpired, 1)
            .subscribe((res: any) => {

                this.surveyList = res;
                this.pageNo = 1;
                refresher ? refresher.complete() : this.customService.hideLoader();
            }, (err: any) => {

                refresher ? refresher.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    doRefresh(refresher) {

        this.getSurveyList(refresher);
    }

    doInfinite(infinite) {

        this.surveyService.fetchSurveysForManagement(this.areSurveysExpired, this.pageNo + 1)
            .subscribe((res: any) => {

                this.surveyList = this.surveyList.concat(res);
                infinite.complete();
            }, (err: any) => {

                infinite.complete();
                this.customService.showToast(err.msg);
            });
    }

    openNewPollModal() {

        let modal = this.modalCtrl.create("NewSurveyPageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
console.log(returnedData);

            if (returnedData) {

                this.surveyList.unshift(returnedData);
            }
        });

    }
}