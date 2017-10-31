import { Component, Input } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { SurveyService } from '../../services/survey.service';
import { CustomService } from '../../services/custom.service';

@IonicPage()
@Component({
    selector: 'survey-vote',
    templateUrl: './survey-vote.html'

})

export class SurveyVoteComponent {

    title: string = "vote";
    surveyId: number;;
    survey: any; /**survey data from server */
    surveyFromList: any;// survey data from Navparams(partial data)

    showInfo:boolean=false;
    fetchService: any;
    isFormValid: boolean = false;
    
    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private customService: CustomService,
        private surveyService: SurveyService
    ) {

        this.surveyId = this.navParams.get('surveyId');
        this.surveyFromList = this.navParams.get('survey');
        this.fetchService = localStorage.getItem('isStudent') === "true" ? this.surveyService.fetchSurveyByIdStudent
            : this.surveyService.fetchSurveyByIdManagement;
        this.getSurvey();
    }

    getSurvey() {

        this.customService.showLoader();
        this.fetchService.call(this.surveyService, this.surveyId)
            .subscribe((res: any) => {
                console.log(res);

                res.forEach((question: any) => {

                    question.selectedOptions = []; //contains the ids of selectd options in case of single choice type &
                    // and array of true false in case of ,multiple choice type
                });

                this.survey =res;
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }
    checkValidity() {
        console.log(this.survey);

        // this.survey.forEach((ques: any) => {
        //     if (ques.optionTypeId == 1) {
        //         if (ques.selectedOptions.length == 0) {
        //             this.isFormValid = false;
        //             return;
        //         } 
        //     }
        //     else if(ques.optionTypeId == 2){
        //         let valid :boolean = false;

        //     }
        // });
    }

    onSubmit() {
        let data = this.buildPayload();

        this.customService.showLoader();
        this.surveyService.voteSurvey(data, this.surveyId)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast(res.message || 'Response submitted successfully');
                this.dismiss(true);

            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });



    }

    buildPayload() {

        let data = [];
        this.survey.forEach((question: any) => {

            let obj: any = { questionId: question.id, optionIds: [] };
            if (question.optionTypeId == 1) {
                obj.optionIds = question.selectedOptions;
            } else if (question.optionTypeId == 2) {

                question.selectedOptions.forEach((bool: boolean, index: number) => {
                    if (bool) {
                        obj.optionIds.push(question.options[index].id);
                    }

                });
            }

            data.push(obj);
        });
        console.log(data);
        return data;
    }

    dismiss(res?: any) {
        this.viewCtrl.dismiss(res);
    }

}