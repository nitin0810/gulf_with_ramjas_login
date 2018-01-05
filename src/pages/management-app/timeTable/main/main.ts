import { Component } from '@angular/core';
import { IonicPage, ModalController, ActionSheetController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { TimeTableService } from '../../../../services/timeTable.service';

@IonicPage()
@Component({
    selector: 'time-table',
    templateUrl: './main.html',
    styles: [` `]
})

export class TimeTablePageManagement {

    title: string = 'Time table';

    /**data required to display the timetable */
    daysName: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    timetableData: any; /** Object whose keys are days and values is the array of periods/slots of timetable*/

    /**ngModal variables */
    date: Date;
    selectedDay: string;
    selectedDayTimetable: Array<any>;
    // loginType:string;
    isAdmin: boolean;

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController,
        public timeTableService: TimeTableService
    ) { }

    ionViewWillEnter() {

        this.date = new Date();
        this.selectedDay = this.date.toDateString().split(' ')[0];
        this.getTimeTable();
        // this.loginType = localStorage.getItem('loginType');
        this.isAdmin = JSON.parse(localStorage.getItem('roles')).indexOf('ADMIN') > -1;
    }

    getTimeTable() {

        this.customService.showLoader();
        this.timeTableService.fetchTimetableByWeek()
            .subscribe((res: any) => {

                this.setTimetableData(res);
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    setTimetableData(res: Array<any>) {

        this.timetableData = {};
        res.forEach((period: any) => {

            let dayName: string = period.dayName.slice(0, 3);
            this.timetableData[dayName] = this.timetableData[dayName] || {};
            this.timetableData[dayName].dayId = this.timeTableService.returnDayId(dayName);
            this.timetableData[dayName].data = this.timetableData[dayName].data || [];
            this.timetableData[dayName].data.push(period);
        });

        console.log('timtable data/////', this.timetableData);
        this.selectedDayTimetable = this.timetableData[this.selectedDay].data;
        this.timeTableService.setTodayId(this.timetableData[this.selectedDay].dayId);
    }

    onDayChange() {

        this.selectedDayTimetable = this.timetableData[this.selectedDay] ? this.timetableData[this.selectedDay].data : undefined;

        if (this.timetableData[this.selectedDay]) {
            this.date = this.timeTableService.returnDateOfSelectedDay(this.timetableData[this.selectedDay].dayId);
        } else {
            this.date = this.timeTableService.returnDateOfSelectedDay(this.timeTableService.returnDayId(this.selectedDay));
        }
    }

    createNewTimeTable() {
        const modal = this.modalCtrl.create("NewTimeTablePageManagement");
        modal.present();
    }

    showoptions(period: any) {

        const actionSheet = this.actionSheetCtrl.create({
            title: 'Select option to Create',
            buttons: [{
                text: 'Attendance',
                handler: () => {
                    actionSheet.dismiss()
                        .then(() => {
                            this.openAttendanceActionSheet(period);
                        }, (err) => { });

                    return false;
                }
            },
            {
                text: 'Assignment',
                handler: () => {
                    this.openModal("NewAssignmentPageManagement", period);
                }
            },
            {
                text: 'Assessment',
                handler: () => {
                    this.openModal("NewSummativePageManagement", period);
                }
            },
            {
                text: 'Poll',
                handler: () => {
                    this.openModal("NewPollPageManagement", period);
                }
            },
            {
                text: 'Survey',
                handler: () => {
                    this.openModal("NewSurveyPageManagement", period);
                }
            },
            {
                text: 'Circular',
                handler: () => {
                    this.openModal("NewCircularComponent", period);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => { }
            }]
        });

        actionSheet.present();

    }

    openAttendanceActionSheet(period: any) {
        const actionSheet2 = this.actionSheetCtrl.create({
            title: 'Attendance',
            buttons: [{
                text: 'New',
                handler: () => { this.openModal("NewAttendancePageManagement", period); }
            },
            {
                text: 'Edit',
                handler: () => { this.openModal("EditAttendancePageManagement", period); }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {  }
            }]
        });
        actionSheet2.present();
    }

    openModal(model: string, period: any) {
        const modal = this.modalCtrl.create(model, { 'timeTableInfo': period });
        modal.present();
    }
}