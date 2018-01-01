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
    daysName: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    timetableData: any; /** Object whose keys are days and values is the array of periods/slots of timetable*/

    /**ngModal variables */
    todayDate: Date;
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

        this.todayDate = new Date();
        this.selectedDay = this.todayDate.toDateString().split(' ')[0];
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
            this.timetableData[dayName] = this.timetableData[dayName] || [];
            this.timetableData[dayName].push(period);
        });

        console.log('timtable data/////', this.timetableData);
        this.selectedDayTimetable = this.timetableData[this.selectedDay];

    }

    onDayChange() {
        console.log('on day change', this.selectedDay);

        this.selectedDayTimetable = this.timetableData[this.selectedDay]
    }

    createNewTimeTable() {
        const modal = this.modalCtrl.create("NewTimeTablePageManagement");
        modal.present();
    }

    showoptions() {

        const actionSheet = this.actionSheetCtrl.create({
            title: 'Select option to Create',
            buttons: [{
                text: 'Attendance',
                handler: () => {              }
            },
            {
                text: 'Assignment',
                handler: () => {

                }
            },
            {
                text: 'Assessment',
                handler: () => {

                }
            },
            {
                text: 'Poll',
                handler: () => {

                }
            },
            {
                text: 'Survey',
                handler: () => {

                }
            },
            {
                text: 'Circular',
                handler: () => {

                }
            },
            {
                text: 'Cancel',
                role:'cancel',
                handler: () => {

                }
            }]
        });

        actionSheet.present();
    }
}