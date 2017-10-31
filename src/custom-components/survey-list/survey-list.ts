import { Component, Input } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'survey-list',
    templateUrl: './survey-list.html'

})

export class SurveyListComponent {

    @Input() surveyList: any;
    @Input() areSurveysExpired: boolean;
    constructor(
        private modalCtrl: ModalController
    ) { }

    openViewModal(survey: any, index: number) {

        let modal = this.modalCtrl.create("SurveyVoteComponent", { 'surveyId': survey.id });
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            if (returnedData) {
                this.surveyList.splice(index, 1);
            }
        });
    }
}