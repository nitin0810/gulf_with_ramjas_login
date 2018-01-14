import { Component } from '@angular/core';
import { IonicPage, ModalController, ActionSheetController, AlertController, Alert } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { TimeTableService } from '../../../../services/timeTable.service';

@IonicPage()
@Component({
    selector: 'time-table',
    templateUrl: './main.html',
    styles: [`
    .scroll-btn{
        overflow-x:scroll;
        display:flex;
    }
    .filterSelected{
        border-color:darkgreen;
        background-color:lightcyan;
    }
     `]
})

export class TimeTablePageManagement {

    title: string = 'Time table';

    /**data required to display the timetable */
    daysName: Array<string>;
    timetableData: any; /** Object whose keys are days and values is the array of periods/slots of timetable*/

    /**ngModal variables */
    date: Date;
    selectedDay: string;
    selectedDayTimetable: Array<any>;
    // loginType:string;
    isAdmin: boolean;

    filters: any = {};


    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController,
        public alertCtrl: AlertController,
        public timeTableService: TimeTableService
    ) { }

    ionViewWillEnter() {

        this.date = new Date();
        this.selectedDay = this.date.toDateString().split(' ')[0];
        this.isAdmin = JSON.parse(localStorage.getItem('roles')).indexOf('ADMIN') > -1;
        this.getDaysAndTimeTable();
    }

    getDaysAndTimeTable() {
        this.customService.showLoader();
        this.timeTableService.fetchDaysAndTimeTable()
            .subscribe((res: any) => {

                this.daysName = this.timeTableService.getDays();
                this.timeTableService.storeTimetableArray(res);
                this.setInitalTimetableData(res);
                this.customService.hideLoader();
                this.timeTableService.fetchDataRequiredForFilters();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    setInitalTimetableData(res: Array<any>) {

        this.setTimetableDataInObjectForm(res);
        this.timeTableService.setTodayId(this.timeTableService.returnDayId(this.selectedDay));
    }

    setTimetableDataInObjectForm(res: Array<any>) {

        this.timetableData = {};
        res.forEach((period: any) => {

            let dayName: string = period.dayName.slice(0, 3);
            this.timetableData[dayName] = this.timetableData[dayName] || {};
            this.timetableData[dayName].dayId = this.timeTableService.returnDayId(dayName);
            this.timetableData[dayName].data = this.timetableData[dayName].data || [];
            this.timetableData[dayName].data.push(period);
        });

        console.log('timtable data/////', this.timetableData);
        console.log('selected day tt before//', this.selectedDayTimetable);

        /**check if timetable has any modules on selectedDay(i.e today), then only dislplay that timetable data */
        if (this.timetableData[this.selectedDay]) {
            this.selectedDayTimetable = this.timetableData[this.selectedDay].data;
        } else {
            this.selectedDayTimetable = [];
        }

        console.log('selected day tt before//', this.selectedDayTimetable);

    }

    onDayChange() {

        /**update the timetable  */
        this.selectedDayTimetable = this.timetableData[this.selectedDay] ? this.timetableData[this.selectedDay].data : undefined;

        /**update the displayed date */
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

    openEditPage(period: any) {
        const modal = this.modalCtrl.create("TimeTableEditPageManagement", { 'timeTableInfo': period });
        modal.present();
    }

    openViewPage(period: any) {
        const modal = this.modalCtrl.create("TimeTableViewPage", { 'timeTableInfo': period });
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
                handler: () => { }
            }]
        });
        actionSheet2.present();
    }

    openModal(model: string, period: any) {
        const modal = this.modalCtrl.create(model, { 'timeTableInfo': period });
        modal.present();
    }


    /**BELOW CODE HANDLES FILTERING THE OPTIONS */
    onEmployeeFilter() {

        if (!this.isRequiredDataAvailable('e')) { return; }

        const alert = this.alertCtrl.create({
            title: 'Choose Employee',
            buttons: [{
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Clear',
                handler: () => {
                    let currentStatus: any = this.filters['e'];
                    this.filters['e'] = null;
                    currentStatus && this.filterAgain();
                }
            },

            {
                text: 'Apply',
                handler: (eId: number) => {
                    // console.log('filtered array:', this.timeTableService.filterTimetable(eId));
                    this.filters['e'] = eId;
                    this.filters['e'] && this.filterAgain();

                }
            }

            ]
        });

        this.addAlertInputs(this.timeTableService.getDataForFiltering('e'), alert, this.filters['e']);
        alert.present();
    }

    /**add radio inputs to select the appropriate option */
    addAlertInputs(list: Array<any>, alert: Alert, selectedInput: number) {

        list.forEach(option => {
            alert.addInput({
                type: 'radio',
                checked: selectedInput == option.id,
                label: option.name || `${option.startTime} - ${option.endTime}`,
                value: option.id,
            });
        });


    }
    



    onDepartmentFilter() { }

    onProgramsFilter() { }
    onYearsFilter() { }
    onSlotsFilter() { }

    isRequiredDataAvailable(filter: string) {

        if (!this.timeTableService.getDataForFiltering(filter)) {
            this.customService.showToast("Required data for this filter couldn't be fetched. Hence, this functionality will not work", null, true);
            return false;
        }
        return true;
    }

    filterAgain() {
        console.log('filter agaiin clalled//////');
        
        this.setTimetableDataInObjectForm(this.timeTableService.filterTimetable(this.filters['e'], this.filters['d'], this.filters['p'], this.filters['y'], this.filters['s']));

    }
}