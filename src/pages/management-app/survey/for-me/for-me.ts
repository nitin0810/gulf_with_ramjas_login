import { CustomService } from '../../../../services/custom.service';
import { SurveyService } from '../../../../services/survey.service';
import { ModalController, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
    selector: 'survey-for-me',
    templateUrl: './for-me.html',
    styles: [` `]
})

export class SurveyForMePageManagement {

    title: string = "Survey (For Me)";
    surveyList: Array<any>;
    pageNo: number=1;
    
    constructor(
        public modalCtrl: ModalController,
        public surveyService: SurveyService,
        public customService: CustomService
    ) {
        this.getSurveys();
    }

    getSurveys(refresher?:any) {

        if(!refresher){this.customService.showLoader();}
        this.surveyService.fetchVotableSurveysForManagement(1)
            .subscribe((res: any) => {
                this.surveyList = res;
                refresher ? refresher.complete():this.customService.hideLoader();
            }, (err: any) => {
                refresher ? refresher.complete():this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

   doRefresh(refresher) {

        this.getSurveys(refresher);
    }

    doInfinite(infinite) {

        this.surveyService.fetchVotableSurveysForManagement( this.pageNo + 1)
            .subscribe((res: any) => {

                this.surveyList = this.surveyList.concat(res);
                infinite.complete();
            }, (err: any) => {

                infinite.complete();
                this.customService.showToast(err.msg);
            });
    }
}