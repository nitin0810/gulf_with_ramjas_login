import { Component} from '@angular/core';
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

    showInfo: boolean = false;
    fetchService: any;
    isSubmitBtnDisabled: boolean = true;

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private customService: CustomService,
        private surveyService: SurveyService
    ) {

        this.surveyId = this.navParams.get('surveyId');
        this.surveyFromList = this.navParams.get('survey');
        /**in case when survey is treated as an evaluation, module or/and lecturer name also to be shown
         * convert the module into array if it is coming as a string
         */
        if(this.surveyFromList.module && (typeof this.surveyFromList.module=="string")){ this.surveyFromList.module=[this.surveyFromList.module];}
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

                this.survey = res;
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    changeVoteBtnStatus() {

        this.isSubmitBtnDisabled = !this.checkValidity();
    }


    checkValidity() {

        let allAnswered = true;

        for (let i = 0; i < this.survey.length; i++) {

            if (this.survey[i].optionTypeId == 1) {

                if (this.survey[i].selectedOptions.length == 0) {

                    allAnswered = false;
                    return allAnswered;
                }

            }
            else if (this.survey[i].optionTypeId == 2) {

                let valid: boolean;
                for (let j = 0; j < this.survey[i].selectedOptions.length; j++) {

                    if (this.survey[i].selectedOptions[j]) {
                        valid = true;
                        break;
                    }
                }
                if (valid) { continue; }
                allAnswered = false
                return allAnswered;
            }
        }

        return allAnswered;
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
        // console.log(data);
        return data;
    }

    dismiss(res?: any) {
        this.viewCtrl.dismiss(res);
    }

}