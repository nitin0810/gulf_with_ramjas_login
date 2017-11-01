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

    openModal(survey: any, index: number) {

        /**view modal is to opened only when aresSurveysExpired is either true or false */
        if (this.areSurveysExpired == true || this.areSurveysExpired == false) {

            let modal = this.modalCtrl.create("ViewSurveyPageManagement", { 'surveyId': survey.id, 'isExpired': this.areSurveysExpired });
            modal.present();
        }

        /**open vote modal  when aresSurveysExpired undefined, no property binding has been done in this case*/
        else {

            let modal = this.modalCtrl.create("SurveyVoteComponent", { 'surveyId': survey.id, 'survey': survey });
            modal.present();
            modal.onDidDismiss((returnedData: any) => {
                if (returnedData) {
                    this.surveyList.splice(index, 1);
                }
            });
        }


    }
}