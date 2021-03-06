

import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavParams } from 'ionic-angular';
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
    audienceList: Array<any> = [
        {
            name : 'B.A.'
        },
        {
            name : 'M.A.'
        },
        {
            name : 'BSC'
        }
    ];;
    departmentList: Array<any>;
    programList: Array<any>;
    yearList: Array<any>;
    yearsListForModule: Array<any>;
    modulesObject: any = {}; // stores array of modules(as value) of multiple yearsIds(as property)
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


    /**This page may also be opened from timetable page
     * In that case moduleId and yearId will be fixed, which will be coming from timetable page
     * Below object stores that data 
     */
    private timetableInfo: any;
    /**in timetable case, audience,module and year select is to be disabled */
    amyDisabled: boolean=false;


    constructor(
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public pollService: PollService,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController
    ) {
    }

    setTimeTableInfo(tt: any) {
        /**timetableInfo will remian undefined if this new poll/survey,events/circular etc. are
         * opened nomally i.e not from TimeTablePage
         */
        this.timetableInfo = tt;
    }

    ionViewWillEnter() {
        this.setTimeTableInfo(this.navParams.get('timeTableInfo'));
        // this.getMainAudeinceData();
    }

    /**Poll,Survey,Events and Circular all have same audience,
     * hence NewPoll page is extended in other three
    */
    getMainAudeinceData() {

        if (!this.pollService.getPollAudienceList()) {

            this.customService.showLoader();
            this.pollService.fetchPollAudience()
                .subscribe((res: any) => {

                    this.audienceList = res.audience.slice(0, 4);
                    this.optionTypesPossible = res.optionType;
                    this.optionLimit = res.optionLimit;
                    this.pollService.savePollAudience(this.audienceList, this.optionTypesPossible, this.optionLimit);
                    this.checkTimetableInfoAndSetData();
                    this.customService.hideLoader();

                }, (err: any) => {

                    this.customService.hideLoader();
                    this.customService.showToast(err.msg);
                });
        } else {

            [this.audienceList, this.optionTypesPossible, this.optionLimit] = this.pollService.getPollAudienceList();
            // this.audienceList = JSON.parse(localStorage.getItem('pollAudienceList'));
            // this.optionTypesPossible = JSON.parse(localStorage.getItem('pollOptionTypes'));
            // this.optionLimit = JSON.parse(localStorage.getItem('pollOptionLimit'));
            this.checkTimetableInfoAndSetData();

        }


    }

    /**check timeTableInfo and if available, handle the data accordingly 
     * 1) restrict the possible yearList and moduleList,
     * 2) preset the selected year and modules
    */
    checkTimetableInfoAndSetData() {

        if (this.timetableInfo) {

            this.mainAudience = { depth: 1, id: 4, name: 'Module', subAudience: [] };
            this.audienceList = [this.mainAudience];
            this.yearForModule = { yearName: this.timetableInfo.yearName, yearId: this.timetableInfo.yearId };
            this.yearsListForModule = [this.yearForModule];
            this.moduleIds = [this.timetableInfo.moduleId];
            this.modulesObject[this.timetableInfo.yearId] = [{ moduleId: this.timetableInfo.moduleId, moduleName: this.timetableInfo.moduleName }];
            this.amyDisabled = true;
        }
    }

    todayDate() {
        return new Date().toISOString().substring(0, 10);
    }

    onAudienceChange() {
        // console.log("audience change called////");
        // clear the appropriate ngModal variable on main audience change to hide the options related to previous audience

        if (this.mainAudience.id == 1) { this.audienceIds = null; }
        if (this.mainAudience.id == 2) {

            this.audienceIds = this.departmentIds = null; // clear the ngModal variable
            if (!this.pollService.getDepartments()) {

                this.customService.showLoader();
                this.pollService.fetchDepartments()
                    .subscribe((res: any) => {

                        this.departmentList = res;
                        this.pollService.saveDepartments(this.departmentList);
                        // localStorage.setItem('pollDepartmentList', JSON.stringify(res));
                        this.customService.hideLoader();
                    }, (err: any) => {

                        this.customService.hideLoader();
                        this.customService.showToast(err.msg);
                    });
            } else {
                this.departmentList = this.pollService.getDepartments();
                // this.departmentList = JSON.parse(localStorage.getItem('pollDepartmentList'));
            }

        } else if (this.mainAudience.id == 3) {

            this.programIds = this.yearIds = null;
            if (!this.pollService.getProgramAndYearList()) {

                this.customService.showLoader();
                this.pollService.fetchPrograms()
                    .subscribe((res: any) => {

                        this.programList = res;
                        // localStorage.setItem('pollProgramList', JSON.stringify(res));
                        this.pollService.fetchYears()
                            .subscribe((res: any) => {

                                this.yearList = res;
                                this.pollService.saveProgramaAndYearList(this.programList, this.yearList);

                                // localStorage.setItem('pollYearList', JSON.stringify(res));
                                this.customService.hideLoader();
                            });
                    }, (err: any) => {

                        this.customService.hideLoader();
                        this.customService.showToast(err.msg);
                    });
            } else {

                [this.programList, this.yearList] = this.pollService.getProgramAndYearList();
                // this.programList = JSON.parse(localStorage.getItem('pollProgramList'));
                // this.yearList = JSON.parse(localStorage.getItem('pollYearList'));


            }
        } else if (this.mainAudience.id == 4) {

            this.moduleIds = this.yearForModule = null;
            if (!this.pollService.getYearListForModule()) {

                this.customService.showLoader();
                this.pollService.fetchYearsForModules()
                    .subscribe((res: any) => {

                        this.yearsListForModule = res;
                        this.pollService.saveYearListForModule(this.yearsListForModule);
                        // localStorage.setItem('pollModuleYears', JSON.stringify(res));
                        this.customService.hideLoader();
                    }, (err: any) => {

                        this.customService.hideLoader();
                        this.customService.showToast(err.msg);
                    });
            } else {
                this.yearsListForModule = this.pollService.getYearListForModule();
                // this.yearsListForModule = JSON.parse(localStorage.getItem('pollModuleYears'));
            }

        }


    }

    onYearForModuleChange() {
        console.log('on years for module change////');

        this.moduleIds = null;
        let id = this.yearForModule.id || this.yearForModule.yearId;
        if (this.modulesObject[id]) {
            return;
        } else {
            this.customService.showLoader();
            this.pollService.fetchModulesByYearId(id)
                .subscribe((res: any) => {

                    this.modulesObject[id] = res;
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
