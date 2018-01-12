import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { TimeTableService } from '../../../../services/timeTable.service';

@IonicPage()
@Component({
    selector: 'time-table-edit',
    templateUrl: './edit.html',
    styles: [` `]
})

export class TimeTableEditPageManagement implements OnInit {

    title: string = 'Edit Timetable';

    timeTableInfo: any; // details of timetable to be edited

    /**data required to edit timetable */
    facultyList: Array<any>; // faculty list with corresponding module
    days: Array<any>;
    slots: Array<any>;

    /**ngModal variables */
    editedFaculty: any;
    editedFacultyName: string;
    editedDay: any;
    editedSlot: any;
    disableSlotDay: boolean = false;

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public timeTableService: TimeTableService
    ) {
        this.timeTableInfo = this.navParams.get('timeTableInfo');
        if (this.timeTableInfo.fromNewPage) {
            this.setAndDisableSlotAndDay();
        } else {
            this.editedFaculty = this.setInitailFaculty(this.timeTableInfo);
            this.editedFacultyName = this.editedFaculty.facultyName;
        }
    }

    setInitailFaculty(tt: any) {
        return {
            facultyId: tt.employeeId,
            facultyName: tt.employeeName,
            moduleId: tt.moduleId,
            moduleName: tt.moduleName,
        };
    }

    setAndDisableSlotAndDay() {
        this.editedFaculty = this.setInitailFaculty(this.timeTableInfo);
        this.editedFacultyName = this.editedFaculty.facultyName;
        this.editedDay = this.timeTableInfo.day;
        this.days = [this.editedDay];
        this.editedSlot = this.timeTableInfo.slot;
        this.slots = [this.editedSlot];
        this.disableSlotDay = true;
    }

    ngOnInit() {
        this.getFacultyList();
    }

    getFacultyList() {
        this.customService.showLoader();
        this.timeTableService.fetchFacultyAndDaysAndSlots(this.timeTableInfo.programId, this.timeTableInfo.yearId, this.timeTableInfo.isEvenSemester)
            .subscribe((res: any) => {

                [this.slots, this.days,this.facultyList] = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onSelectFaculty() {
        let searchPage = this.modalCtrl.create("FacultySearchPage", { 'searchList': this.facultyList, 'title': 'Faculty' });
        searchPage.present();
        searchPage.onDidDismiss((selected) => {
            if (selected) {

                this.editedFaculty = selected.selectedSearch;
                this.editedFacultyName = selected.selectedSearch.facultyName;
            }
        });
    }
 

    onSubmit() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to edit the Timetable ?',
            buttons: [
                {
                    text: 'Edit',
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
            employeeId: this.editedFaculty.facultyId,
            moduleId: this.editedFaculty.moduleId,
            slotId: this.editedSlot.id,
            dayId: this.editedDay.id,
        };
    }

    submitTimetable(payLoad: any) {

        this.customService.showLoader();
        this.timeTableService.editTimetable(payLoad, this.timeTableInfo.id)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Timetable updated successfully');
                this.dismiss();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg, null, true);
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}