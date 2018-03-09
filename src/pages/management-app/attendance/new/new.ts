import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, ModalController, ActionSheetController, NavParams, AlertController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AttendanceService } from '../../../../services/attendance.service';

@IonicPage()
@Component({
    templateUrl: './new.html'

})

export class NewAttendancePageManagement implements OnInit{

    title: string = "New Attendance";

    /** data required to submit attendance*/
    timeTableInfo: any;
    selectedDate: string;
    studentsList: Array<any>;

    markAllPresent: boolean = false;

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        private modalController:ModalController,
        private actionSheetCtrl: ActionSheetController,
        private customService: CustomService,
        private attendanceService: AttendanceService
    ) {
        this.timeTableInfo = this.navParams.get('timeTableInfo');
        this.selectedDate = this.todayDate();
    }

    ngOnInit() {
        this.getStudentsList();
    }

    getStudentsList() {

        this.customService.showLoader();
        this.attendanceService.fetchStudents(this.timeTableInfo.programId, this.timeTableInfo.yearId)
            .subscribe((res: any) => {

                this.studentsList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    setStudentsAttendanceAsPresent(ev: any) {
        if (ev.checked) {
            this.studentsList.forEach((s: any) => s.attendance = s.attendance || "P");
        } else {
            this.studentsList.forEach((s: any) => s.attendance = s.attendance === "P" ? null : s.attendance);
        }

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
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Attendance submitted successfully');
            }, (err: any) => {
                this.customService.hideLoader();
                err.status == 0 ? this.saveAttendanceOffline(payLoad) : this.customService.showToast(err.msg);
            });
    }

    saveAttendanceOffline(data: any) {

        const alert = this.alertCtrl.create({
            title: 'No Internet',
            subTitle: 'Save Attendance ?',
            message: 'We will try again to upload the attendance when you are connected to internet.',
            buttons: [
                {
                    text: "Don't Save",
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Save',
                    handler: () => {

                        let savedAttd: Array<any> = JSON.parse(localStorage.getItem('savedAttendances')) || [];
                        savedAttd.push({
                            uploadData: data, // refers to saved attendance
                            metaData: this.timeTableInfo,// contains other info such as pgm name, module name, year etc.
                            isUploaded: false,
                            comment:''
                        });

                        localStorage.setItem('savedAttendances', JSON.stringify(savedAttd));
                        this.customService.showToast('Attendance saved successfully');
                    }
                }
            ]
        });

        alert.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    openStudentAttendanceSearch(){
        const modal =this.modalController.create('SearchAttendancePageManagement',{'searchList':this.studentsList});
    modal.present();
    modal.onDidDismiss((editedStudentList:any)=>{
        if(editedStudentList){
            this.studentsList = editedStudentList
        }
    });
    }
}