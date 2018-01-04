import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, ActionSheetController, NavParams } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AttendanceService } from '../../../../services/attendance.service';

@IonicPage()
@Component({
    templateUrl: './new.html'

})

export class NewAttendancePageManagement {

    title: string = "New Attendance";

    /** data required to submit attendance*/
    timeTableInfo: any;
    selectedDate: string;
    studentsList: Array<any>;

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private actionSheetCtrl: ActionSheetController,
        private customService: CustomService,
        private attendanceService: AttendanceService
    ) {
        this.timeTableInfo = this.navParams.get('timeTableInfo');
        this.selectedDate = this.todayDate();
    }

    ionViewWillEnter() {
        this.getStudentsList();
    }

    getStudentsList() {

        this.customService.showLoader();
        this.attendanceService.fetchStudents(this.timeTableInfo.programId, this.timeTableInfo.yearId)
            .subscribe((res: any) => {

                this.studentsList = res;
                this.setStudentsDefaultAttendance(res);
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    setStudentsDefaultAttendance(students: Array<any>) {
        students.forEach((s: any) => s.attendance = "P");
    }


    todayDate() { return new Date().toISOString().substring(0, 10); }

    onSubmit() {

        const actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure to want to submit ?',
            buttons: [{
                text: 'Submit',
                handler: () => { this.submitFinally(); }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => { }
            }]
        });
actionSheet.present();
    }

    submitFinally() {
        let payLoad = this.buildPayload();
        this.postAttendance(payLoad);
    }

    buildPayload() {
        let data: any = {};
        data.moduleId = this.timeTableInfo.moduleId;
        data.employeeId = parseInt(localStorage.getItem('id'));
        data.date = this.selectedDate.split('-').join('/');
        data.slotId = this.timeTableInfo.slotId;
        data.attendances = [];
        this.studentsList.forEach((s: any) => {
            data.attendances.push({
                studentId: s.id,
                attendance: s.attendance
            });
        });

        return data;
    }

    postAttendance(payLoad: any) {
        this.customService.showLoader();
        this.attendanceService.postAttendance(payLoad)
        .subscribe((res:any)=>{
            this.customService.hideLoader();
            this.customService.showToast('Attendance submitted successfully');
        },(err:any)=>{
            this.customService.hideLoader();
            console.log(err);
            
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}