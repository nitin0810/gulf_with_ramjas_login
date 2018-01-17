import { Component, OnInit, transition } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, ActionSheetController, NavController } from 'ionic-angular';
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
    editedDay: { id: number, day: string };
    editedSlot: { id: number, startTime: string, endTime: string, active: boolean };
    disableSlotDay: boolean = false;

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        private viewCtrl: ViewController,
        private navCtrl: NavController,
        private navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public timeTableService: TimeTableService
    ) {
        this.timeTableInfo = this.navParams.get('timeTableInfo');
        if (this.timeTableInfo.fromNewPage) {
            this.setAndDisableSlotAndDay();
        } else {
            this.editedFaculty = this.setInitialFaculty(this.timeTableInfo);
            this.editedFacultyName = this.editedFaculty.facultyName;
            console.log(this.timeTableInfo);


        }
    }

    setInitialFaculty(tt: any) {
        return {
            facultyId: tt.employeeId,
            facultyName: tt.employeeName,
            moduleId: tt.moduleId,
            moduleName: tt.moduleName,
        };
    }

    setAndDisableSlotAndDay() {
        /**day and slots are in object form here having id and name as keys */
        this.editedFaculty = this.setInitialFaculty(this.timeTableInfo);
        this.editedFacultyName = this.editedFaculty.facultyName;
        this.editedDay = this.timeTableInfo.day;
        this.days = [this.editedDay];
        this.editedSlot = this.timeTableInfo.slot;
        this.slots = [this.editedSlot];
        this.disableSlotDay = true;
    }

    ngOnInit() {
        if (this.timeTableInfo.fromNewPage) {

            this.getFacultyList();
        } else {
            this.getFacultyDaysSlots();
        }
    }

    getFacultyList() {
        this.customService.showLoader();
        this.timeTableService.fetchFacultyByProgramAndYear(this.timeTableInfo.programId, this.timeTableInfo.yearId, this.timeTableInfo.isEvenSemester)
            .subscribe((res: any) => {

                this.facultyList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    getFacultyDaysSlots() {
        this.customService.showLoader();
        this.timeTableService.fetchFacultyAndDaysAndSlots(this.timeTableInfo.programId, this.timeTableInfo.yearId, this.timeTableInfo.isEvenSemester)
            .subscribe((res: any) => {

                [this.slots, this.days, this.facultyList] = res;
                /**Prefill the slot and day fieds */
                this.editedDay = this.days.find(d => d.id == this.timeTableInfo.dayId);
                this.editedSlot = this.slots.find(s => s.id == this.timeTableInfo.slotId);
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

        let a: any = {};
        a.employeeId = this.editedFaculty.facultyId;
        a.moduleId = this.editedFaculty.moduleId;

        /**send slot and day only in case of normal edit */
        if (!this.timeTableInfo.fromNewPage) {
            a.slotId = this.editedSlot.id;
            a.dayId = this.editedDay.id;
        }
        return a;
    }

    submitTimetable(payLoad: any) {

        this.customService.showLoader();
        this.timeTableService.editTimetable(payLoad, this.timeTableInfo.id)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Timetable updated successfully');
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg, null, true);
            });
    }

    dismiss(res?: any) {
        /**res: updated/new data of edited timetable */

        /**Normal close */
        if (!res) {
            this.viewCtrl.dismiss();
            return;
        }

        /**when timetable info doesn't exist currently at client side */
        if (this.timeTableInfo.fromNewPage) {
            this.timeTableService.updateTimetable(res);

            /**We want to go to main TT page directly, hence first dismiss the 
             * NewTT modal(present below the current i.e. EditTt modal in the stack) along with
             * 'res' in order to update the TT on main page
             */

            let newModal: ViewController = this.navCtrl.first(); // returns the NewTT modal page
            newModal.dismiss(res)
                .then(() => {
                    this.viewCtrl.dismiss();
                });

        } else {
            this.timeTableService.updateTimetable(res, this.timeTableInfo.id);
            this.viewCtrl.dismiss(res);
        }
    }
}