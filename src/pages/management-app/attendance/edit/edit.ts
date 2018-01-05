import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, Slides, ActionSheetController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AttendanceService } from '../../../../services/attendance.service';

@IonicPage()
@Component({
    selector: 'attendance-edit',
    templateUrl: './edit.html',
    styles: [`
    ion-slides{
        height: initial !important;
    } `]
})

export class EditAttendancePageManagement {

    @ViewChild(Slides) slides: Slides;
    title: string = 'Edit Attendance';

    /**data required to edit the timetable */
    attendanceList: Array<any>;
    presentStudents: number;
    totalStudents: number;
    attendanceListTemp: Array<any>;// used in search

    /**ngModal variables */
    timeTableInfo: any;
    date: string;
    selectedStudent: any;
    editedAttendance: string;
    searchInput: string;

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private actionSheetCtrl: ActionSheetController,
        private customService: CustomService,
        private attendanceService: AttendanceService
    ) {
        this.timeTableInfo = this.navParams.get('timeTableInfo');
        this.date = this.todayDate();
        this.getInfoRequiredForAttendance();
    }

    todayDate() {
        return new Date().toISOString().substring(0, 10);
    }

    ionViewWillEnter() {
        this.getAttendances();
        this.slides.lockSwipeToNext(true);
    }

    getAttendances() {
        this.customService.showLoader('Fetching Students...');
        this.attendanceService.fetchAttendance(this.getInfoRequiredForAttendance())
            .subscribe((res: any) => {

                this.totalStudents = res[0].TotalStudent;
                this.presentStudents = res[0].Present;
                this.attendanceList = res[1];
                this.attendanceListTemp = this.attendanceList;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    getInfoRequiredForAttendance() {
        return {
            moduleId: this.timeTableInfo.moduleId,
            slotId: this.timeTableInfo.slotId,
            date: this.date.split('-').join('/')
        };
    }

    onDateChange() {
        this.getInfoRequiredForAttendance();
        this.getAttendances();
    }


    onSearchInput(event: any) {

        /**Ignore the click event */
        if (event.type != 'input') { return; }
        if (this.searchInput.trim().length >= 1) {

            this.attendanceListTemp = this.attendanceList.filter((at: any) => {
                return at.studentName.toLowerCase().includes(this.searchInput.toLowerCase().trim());
            });
        }
        if (this.searchInput.trim().length == 0) {

            this.attendanceListTemp = this.attendanceList;
        }
    }

    onSearchClear(event: any) {

        this.attendanceListTemp = this.attendanceList;
    }

    onStudentSelect(stud: any) {
        this.selectedStudent = stud;
        this.editedAttendance = stud.attendance; //initialize this with current attendance
        this.slides.lockSwipeToNext(false);
        this.slides.slideNext();
    }

    goToList(){this.slides.slidePrev();}

    onEditBtn() {
        if (this.editedAttendance == this.selectedStudent.attendance) {
            this.customService.showToast('Attendance is unchanged');
            return;
        }
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure to edit ?',
            buttons: [{
                text: 'Edit',
                handler: () => { this.finallyEdit(); }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => { }
            }]
        });
        actionSheet.present();

    }

    finallyEdit() {
        this.customService.showLoader();
        this.attendanceService.editAttendance({ attendance: this.editedAttendance }, this.selectedStudent.attendanceId)
            .subscribe((res: any) => {
                this.updateAttendanceList(res);
                this.customService.hideLoader();
                this.customService.showToast('Updated successfully');
                this.selectedStudent = null;
                this.slides.slidePrev();
                this.slides.lockSwipeToNext(true);
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    updateAttendanceList(res: any) {

        this.selectedStudent.attendance = res.attendance;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


}