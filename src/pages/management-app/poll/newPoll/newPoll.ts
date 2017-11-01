

import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { PollService } from '../../../../services/poll.service';
import { CustomService } from '../../../../services/custom.service';
// import {} from './';
@IonicPage()
@Component({
    selector: 'newPoll',
    templateUrl: './newPoll.html',
    styles: [` `]
})

export class NewPollPageManagement {

    title: string = "new poll";

    /** data  required to create the poll*/
    audienceList: Array<any>;
    departmentList: Array<any>;
    programList: Array<any>;
    yearList: Array<any>;
    yearsListForModule: Array<any>;
    moduleList: Array<any>;
    optionTypesPossible: Array<any>;
    optionLimit: number;

    /**ngModal variables */
    mainAudience: any;
    audienceIds: Array<number>; //used when mainAudience is university or department
    departmentIds: Array<any>;   //used only when mainAudience is  department
    programIds: Array<any>;  //used only when mainAudience is  program
    yearIds: Array<any>;  //used only when mainAudience is  program 
    yearForModule: any; // used only when mainAudience is module
    moduleIds: Array<any>; // used only when mainAudience is module

    question: string;
    options: Array<{ choice: String }> = [{ choice: "" }, { choice: "" }];
    expireDate: any = new Date().toISOString().substring(0, 10);
    optionTypeId: number;


    constructor(
        public viewCtrl: ViewController,
        public pollService: PollService,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController
    ) { }

    ionViewWillEnter() {

        this.getMainAudeinceData();
    }

    getMainAudeinceData() {

        if (!localStorage.getItem('pollAudienceList')) {

            this.customService.showLoader();
            this.pollService.fetchPollAudience()
                .subscribe((res: any) => {

                    this.audienceList = res.audience.slice(0, 4);
                    this.optionTypesPossible = res.optionType;
                    this.optionLimit = res.optionLimit;
                    localStorage.setItem('pollAudienceList', JSON.stringify(this.audienceList));
                    localStorage.setItem('pollOptionTypes', JSON.stringify(this.optionTypesPossible));
                    localStorage.setItem('pollOptionLimit', JSON.stringify(this.optionLimit));

                    this.customService.hideLoader();

                }, (err: any) => {

                    this.customService.hideLoader();
                    this.customService.showToast(err.msg);
                });
        } else {
            this.audienceList = JSON.parse(localStorage.getItem('pollAudienceList'));
            this.optionTypesPossible = JSON.parse(localStorage.getItem('pollOptionTypes'));
            this.optionLimit = JSON.parse(localStorage.getItem('pollOptionLimit'));
        }
    }

    todayDate() {
        return new Date().toISOString().substring(0, 10);
    }

    onAudienceChange() {
        // clear the appropriate ngModal variable on main audience change

        if (this.mainAudience.id == 1) { this.audienceIds = null; }
        if (this.mainAudience.id == 2) {

            this.audienceIds = this.departmentIds = null; // clear the ngModal variable
            if (!localStorage.getItem('pollDepartmentList')) {

                this.customService.showLoader();
                this.pollService.fetchDepartments()
                    .subscribe((res: any) => {

                        this.departmentList = res;
                        localStorage.setItem('pollDepartmentList', JSON.stringify(res));
                        this.customService.hideLoader();
                    }, (err: any) => {

                        this.customService.hideLoader();
                        this.customService.showToast(err.msg);
                    });
            } else {

                this.departmentList = JSON.parse(localStorage.getItem('pollDepartmentList'));
            }

        } else if (this.mainAudience.id == 3) {

            this.programIds = this.yearIds = null;
            if (!localStorage.getItem('pollProgramList') && !localStorage.getItem('pollYearList')) {

                this.customService.showLoader();
                this.pollService.fetchPrograms()
                    .subscribe((res: any) => {

                        this.programList = res;
                        localStorage.setItem('pollProgramList', JSON.stringify(res));

                        this.pollService.fetchYears()
                            .subscribe((res: any) => {

                                this.yearList = res;
                                localStorage.setItem('pollYearList', JSON.stringify(res));
                                this.customService.hideLoader();
                            });
                    }, (err: any) => {

                        this.customService.hideLoader();
                        this.customService.showToast(err.msg);
                    });
            } else {
                this.programList = JSON.parse(localStorage.getItem('pollProgramList'));
                this.yearList = JSON.parse(localStorage.getItem('pollYearList'));


            }
        } else if (this.mainAudience.id == 4) {

            this.moduleIds = this.yearForModule = null;
            if (!localStorage.getItem('pollModuleYears')) {

                this.customService.showLoader();
                this.pollService.fetchYearsForModules()
                    .subscribe((res: any) => {

                        this.yearsListForModule = res;
                        localStorage.setItem('pollModuleYears', JSON.stringify(res));
                        this.customService.hideLoader();
                    }, (err: any) => {

                        this.customService.hideLoader();
                        this.customService.showToast(err.msg);
                    });
            } else {

                this.yearsListForModule = JSON.parse(localStorage.getItem('pollModuleYears'));
            }

        }


    }

    onYearForModuleChange() {

        this.moduleIds = null;
        if (this.yearForModule.modules) {

            this.moduleList = this.yearForModule.modules;
        } else {
            this.customService.showLoader();
            this.pollService.fetchModulesByYearId(this.yearForModule.id || this.yearForModule.yearId)
                .subscribe((res: any) => {

                    this.moduleList = res;
                    let selectedYear = this.yearsListForModule.find((element: any) => {
                        return (this.yearForModule.id || this.yearForModule.yearId) == (element.id || element.yearId);
                    });

                    selectedYear.modules = res;
                    localStorage.setItem('pollModuleYears', JSON.stringify(this.yearsListForModule));
                    this.customService.hideLoader();
                }, (err: any) => {
                    this.customService.hideLoader();
                    this.customService.showToast(err.msg);
                });
        }
    }

    onAddOptionBtn() {

        this.options.push({ choice: "" });
    }

    removeOption(index: number) {

        this.options.splice(index, 1);
    }

    onSubmit() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to submit the poll ?',
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

        // console.log('mainAudience', this.mainAudience);
        // console.log('audince ids', this.audienceIds);
        // console.log('depts', this.departmentIds);
        // console.log('yearsids', this.yearIds);
        // console.log('programIds', this.programIds);
        // console.log('yearForModule', this.yearForModule);
        // console.log('moduleIds', this.moduleIds);

        // console.log('title', this.title);
        // console.log('expireDate', this.expireDate);
        // console.log('options', this.question);
        // console.log('optionType', this.optionTypeId);

        let data: any = {
            question: this.question,
            expiredAt: this.expireDate,
            subOptions: this.options,
            optionTypeId: this.optionTypeId,
            mainAudienceId: this.mainAudience.id
        }
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
        this.pollService.submitPoll(data)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Poll Submitted Successfully');
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }


    dismiss(data?: any) {

        this.viewCtrl.dismiss({ 'data': data });
    }
}
