import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';

import { NewPollPageManagement } from '../../poll/newPoll/newPoll';
import { PollService } from '../../../../services/poll.service';
import { SurveyService } from '../../../../services/survey.service';

@IonicPage()
@Component({
    selector: 'newSurvey',
    templateUrl: './newSurvey.html',
    styles: [` `]
})

export class NewSurveyPageManagement extends NewPollPageManagement {

    title: string = "new survey";


    /**ngModal variables (that are new to survey/ not avialbale in base class) */
    surveyTitle: string;
    description: string;
    questions: Array<{
        question: string,
        optionTypeId: number,
        subOptions: Array<{ choice: "" }>
    }> = [
        {
            question: "",
            optionTypeId: 1, // 1 is used just to initialize
            subOptions: [{ choice: "" }, { choice: "" }]
        }
    ];

    constructor(
        public viewCtrl: ViewController,
        public pollService: PollService,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController,
        private surveyService: SurveyService
    ) {
        super(viewCtrl, pollService, customService, actionSheetCtrl);
    }

    ionViewWillEnter() {

        this.getMainAudeinceData();
    }

    onAddOptionBtnSurvey(questionIndex: number) {

        this.questions[questionIndex].subOptions.push({ choice: "" });
    }

    removeOptionSurvey(questionIndex: number, optionIndex: number) {

        this.questions[questionIndex].subOptions.splice(optionIndex, 1);
    }

    onAddQuestion() {
        this.questions.push({
            question: "",
            optionTypeId: 1, // 1 is used just to initialize
            subOptions: [{ choice: "" }, { choice: "" }]
        });
    }

    removeQuestion(index: number) {
        this.questions.splice(index, 1);
    }

    onSubmit() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to submit the survey ?',
            buttons: [
                {
                    text: 'Submit',
                    handler: () => {
                        this.finallySubmit();
                    }

                },
                {
                    text: 'Cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();

    }

    finallySubmit() {

        let data: any = {
            title: this.title,
            description: this.description,
            expiredAt: this.expireDate,
            questions: this.questions,
            mainAudienceId: this.mainAudience.id
        };


        switch (this.mainAudience.id) {

            case 1: data.audienceIds = this.audienceIds;
                break;

            case 2: data.audienceIds = this.audienceIds;
                data.departmentIds = this.departmentIds;
                break;

            case 3: data.programIds = this.programIds;
                data.yearIds = this.yearIds;
                break;

            case 4:
                data.yearIds = [this.yearForModule.id || this.yearForModule.yearId];
                data.moduleIds = this.moduleIds;
        }


        console.log(data);
        this.customService.showLoader();
        this.surveyService.submitSurvey(data)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Survey Submitted Successfully');
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }

}