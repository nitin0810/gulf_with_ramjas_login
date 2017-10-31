
import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavController, NavParams, DateTime } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { SurveyService } from '../../../../services/survey.service';

@IonicPage()
@Component({
    selector: 'view-survey',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewSurveyPageManagement {

    @ViewChild('dateTime') dateTime: DateTime;
    title: string = "view survey";
    surveyId: number; // recieved from navparams
    isExpired :boolean; // recieved from navparams
    survey: any; // complete survey info to be fetched from server
    newExpiryDate: any = new Date().toISOString().substring(0, 10);
    showInfo: boolean = false;

    constructor(
        private navparam: NavParams,
        private viewCtrl: ViewController,
        private surveyService: SurveyService,
        private customService: CustomService
    ) {
        this.surveyId = this.navparam.get('surveyId');
        this.isExpired =this.navparam.get('isExpired');
        this.getSurveyInfo();
    }

    getSurveyInfo() {

        this.customService.showLoader();
        this.surveyService.fetchSurveyResultById(this.surveyId)
            .subscribe((res: any) => {

                this.survey = res;
                console.log(this.survey);
                this.newExpiryDate = this.survey.expiredAt;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    todayDate() {
        return new Date().toISOString().substring(0, 10);
    }

    editExpiryDate() {

        this.dateTime.open();
    }

    updateExpiryDate() {

        // this.customService.showLoader();
        // this.surveyService.editExpiryDate({ expiredAt: this.newExpiryDate }, this.poll.id)
        //     .subscribe((res: any) => {
        //         this.customService.hideLoader();
        //         this.customService.showToast("Expiry date edited successfully");
        //         this.poll.expiredAt = res.expiredAt; // same as this.newExpiryDate;
        //     }, (err: any) => {
        //         this.customService.hideLoader();
        //         this.customService.showToast(err.msg);
        //     });
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}