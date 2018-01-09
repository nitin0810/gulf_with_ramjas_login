import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { TimeTableService } from '../../../../services/timeTable.service';

@IonicPage()
@Component({
    selector: 'time-table-new',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewTimeTablePageManagement implements OnInit {

    title: string = 'New Timetable';

    /**data required to create the timetable */
    empList: Array<any>;
    pgmList: Array<any>;
    moduleAndYearList: Array<any>;

    roomList: Array<any>;
    slotList: Array<any>;
    dayList: Array<any>;
    rsdAvailable: boolean = false; /**indicates wheather room, day and slot info is available or not */

    /**ngModal variables */
    employee: any;
    employeeName: string;
    program: any;
    moduleYearObject: any;
    day: any;
    slot: any;
    room: any;

    constructor(
        private viewCtrl: ViewController,
        private actionSheetCtrl: ActionSheetController,
        private customService: CustomService,
        private mdlCtrl: ModalController,
        private timeTableService: TimeTableService
    ) { }

    ngOnInit() {
        this.getEmployeeandRSDList();
    }

    getEmployeeandRSDList() {

        this.customService.showLoader();
        this.timeTableService.fetchEmployeeandRSDInfo()
            .subscribe((res: Array<any>) => {

                [this.empList, this.roomList, this.slotList, this.dayList] = res;
                this.rsdAvailable = true;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast("Couldn't fetch the required data, Try again");
                this.dismiss();
            });

    }

    onnSelectFaculty() {

        let searchPage = this.mdlCtrl.create("FacultySearchPage", { 'searchList': this.empList, 'title': 'Faculty' });
        searchPage.present();
        searchPage.onDidDismiss((selected) => {
            if (selected) {

                /**fetch programs only if faculty is seleted first time OR is other than previously selected one*/
                if (!this.employee || this.employee.id !== selected.selectedSearch.id) {
                    this.onFacultyChange(selected.selectedSearch.id);
                }
                this.employee = selected.selectedSearch;
                this.employeeName = this.employee.name;
                this.program = this.moduleAndYearList = null;
            }
        });
    }

    onFacultyChange(eId: number) {

        this.customService.showLoader('Fetching Programs...');
        this.timeTableService.fetchProgramList(eId)
            .subscribe((res: any) => {

                this.pgmList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    onProgramChange() {

        if (!this.program) { return; }/** ignore this method call when program is null*/
        this.getModuleAndYearList();
        this.moduleYearObject = null;

    }

    getModuleAndYearList() {
        this.customService.showLoader();
        this.timeTableService.fetchModuleAndYearList(this.program.programId, this.employee.id)
            .subscribe((res: any) => {

                this.moduleAndYearList = res;
                this.moduleAndYearList.forEach((element: any) => {
                    element.semester = this.giveSemester(element.yearName, element.isEvenSemester);
                });
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    giveSemester(year: string, isEven: boolean) {

        switch (year) {

            case "1st": return isEven ? "2nd" : "1st";
            case "2nd": return isEven ? "4th" : "3rd";
            case "3rd": return isEven ? "6th" : "5th";
            case "4th": return isEven ? "8th" : "7th";
            default: return "N.A.";
        }
    }


    onSubmit() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to create the Timetable ?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => { this.finallySubmit(); }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => { }
                }
            ]
        });
        actionSheet.present();
    }


    finallySubmit() {

        let payLoad: any = this.buildPayload();
        this.submitTimetable(payLoad);
    }

    buildPayload() {

        return {
            employeeId: this.employee.id,
            programId: this.program.programId,
            yearId: this.moduleYearObject.yearId,
            moduleId: this.moduleYearObject.moduleId,
            isEvenSemester:this.moduleYearObject.isEvenSemester,
            dayId: this.day.id,
            slotId: this.slot.id,
            roomId: this.room.id
        };
    }

    submitTimetable(payLoad: any) {

        this.customService.showLoader('Submiting..');
        this.timeTableService.submitTimetable(payLoad)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast("Timetable created successfully");
                this.dismiss();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}