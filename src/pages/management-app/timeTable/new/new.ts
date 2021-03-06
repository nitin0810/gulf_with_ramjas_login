import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
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
        private alertCtrl: AlertController,
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

    onSelectFaculty() {

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
                this.pgmList && this.pgmList.length == 0 && this.customService.showToast('No programs found with this faculty');
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
                this.moduleAndYearList && this.moduleAndYearList.length == 0 && this.customService.showToast('No modules found in this program');
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
            isEvenSemester: this.moduleYearObject.isEvenSemester,
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
                this.updateTimeTableArray(res);
                this.openViewPageAfterNew(res);
            }, (err: any) => {
                this.customService.hideLoader()
                    .then(() => {

                        /**when entered module at entered slot is being taught by someone else
                        * then error body doesn't has an error key
                         */
                        console.log('printing error.body', err.body);

                        if (err.body.error) {
                            this.customService.showToast(err.msg, null, true);
                        } else {
                            this.showAlert(err.body);
                        }
                    });
            });
    }

    showAlert(body: any) {


        let msg: string;
        if (body.active) {
            msg = `
                  ${body.employeeName} already teaches module ${body.moduleName} at the selected slot.
                  Do you want to edit the faculty of this existing timetable ? 
                   `;
        } else {
            msg = `
                ${body.employeeName} (currently not active) already teaches module ${body.moduleName} at the selected slot.
                Do you want to Activate/Edit the faculty of this existing timetable ?
             `;
        }
        const alert = this.alertCtrl.create({
            title: 'Duplicate Entry',
            message: msg,
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => { }
            }]
        });

        if (!body.active) {
            alert.addButton({
                text: 'Activate',
                handler: () => {
                    alert.dismiss()
                        .then(() => {
                            this.onActivate(body);
                        });
                    return false;
                }
            });
        }

        alert.addButton({
            text: 'Edit',
            handler: () => { this.openEditPage(body); }
        });

        alert.present();
    }

    onActivate(body: any) {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to activate this Timetable ?',
            buttons: [
                {
                    text: 'Activate',
                    handler: () => {
                        this.sendActivateRequest(body.id);
                    }
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

    sendActivateRequest(tId: number) {

        this.customService.showLoader();
        this.timeTableService.editTimetable({}, tId)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Activated successfully');
                this.dismiss(res);
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openEditPage(body: any) {
        /**add necessary data which is required by edit page */
        body.programId = this.program.programId;
        body.programName = this.program.programName;
        body.yearId = this.moduleYearObject.yearId;
        body.yearName = this.moduleYearObject.yearName;
        body.slot = this.slot;
        body.day = this.day;
        body.isEvenSemester = this.moduleYearObject.isEvenSemester;
        body.fromNewPage = true; // to differentiate it from normal edit (when editing is done from main timetable page) 

        const modal = this.mdlCtrl.create("TimeTableEditPageManagement", { 'timeTableInfo': body });
        modal.present();
    }

    openViewPageAfterNew(res: any) {

        const modal = this.mdlCtrl.create("TimeTableViewPage", { 'timeTableInfo': res });
        modal.present();
    }

    updateTimeTableArray(res: any) {

        res && this.timeTableService.updateTimetable(res);
    }

    dismiss(res?: any) {

       this.updateTimeTableArray(res);
        this.viewCtrl.dismiss(res);
    }
}