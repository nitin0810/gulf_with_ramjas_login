import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, ActionSheetController, NavController, AlertController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { TimeTableService } from '../../../../services/timeTable.service';

@IonicPage()
@Component({
    selector: 'time-table-edit',
    templateUrl: './edit.html',
    styles: [` `]
})
/**This page can be opened in following three ways: 
 * 1) From Timetable main  page (normal case)
 * 2) From New Timetable page 
 * 3) From Edit Timetable page (in this case we have two EditPage instances, one on top of other)
  */
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
        private alertCtrl: AlertController,
        public timeTableService: TimeTableService
    ) {
        this.timeTableInfo = this.navParams.get('timeTableInfo');

        if (this.timeTableInfo.fromNewPage || this.timeTableInfo.fromEditPage) {
            this.setAndDisableSlotAndDay();
        } else {
            this.editedFaculty = this.setInitialFaculty(this.timeTableInfo);
            this.editedFacultyName = this.editedFaculty.facultyName;
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
        if (this.timeTableInfo.fromNewPage || this.timeTableInfo.fromEditPage) {

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
                /**Prefill the slot and day fields */
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
        if (!this.timeTableInfo.fromNewPage && !this.timeTableInfo.fromEditPage) {
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

                this.customService.hideLoader()
                    .then(() => {

                        /**same case can happen as in New TT page 
                         * For now, most of the code has been repeated here to handle this situation
                         * It is to be optimized in future
                        */

                        /**when entered module at entered slot is being taught by someone else
                        * then error body doesn't has an error key
                        */
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
                // this.dismiss(res);
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openEditPage(body: any) {
        /**add necessary data which is required by edit page */
        body.programId = this.timeTableInfo.programId;
        body.programName = this.timeTableInfo.programName;
        body.yearId = this.timeTableInfo.yearId;
        body.yearName = this.timeTableInfo.yearName;
        body.slot = { id: this.timeTableInfo.id, active: true, startTime: this.timeTableInfo.startTime, endTime: this.timeTableInfo.endTime };
        body.day = { id: this.timeTableInfo.dayId, day: this.timeTableInfo.dayName };
        body.isEvenSemester = this.timeTableInfo.isEvenSemester;
        body.fromEditPage = true; // to differentiate it from normal edit and editing from New page 

        const modal = this.modalCtrl.create("TimeTableEditPageManagement", { 'timeTableInfo': body });
        modal.present();
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

        } else if (this.timeTableInfo.fromEditPage) {
            console.log('INSIDE EDIT DISMISS', res);

            this.timeTableService.updateTimetable(res, res.id);
            res['fromDoubleEditPage'] = true;
            res['oldId'] = this.timeTableInfo.id;
            /**We want to go to main TT page directly, hence first dismiss the 
             * editTT modal(present below the current i.e. EditTt modal in the stack) along with
             * 'res' in order to update the TT on main page
             */

            let editModal: ViewController = this.navCtrl.first(); // returns the below editTT modal page
            editModal.dismiss(res)
                .then(() => {
                    this.viewCtrl.dismiss();
                });
        }

        else {
            this.timeTableService.updateTimetable(res, this.timeTableInfo.id);
            this.viewCtrl.dismiss(res);
        }
    }
}