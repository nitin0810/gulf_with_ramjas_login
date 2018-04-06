import { Component, OnDestroy } from '@angular/core';
import { IonicPage, ModalController, ActionSheetController, AlertController, Alert, NavController, App } from 'ionic-angular';
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

export class TimeTablePageManagement implements OnDestroy {

    title: string = 'Time Table';

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
        public timeTableService: TimeTableService,
        public navcont? : NavController,
        public appCtrl? : App
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
                /**fetch data required for filtering only in case of admin  */
                this.isAdmin && this.timeTableService.fetchDataRequiredForFilters();
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
            this.timetableData[dayName].dayId = this.timetableData[dayName].dayId || this.timeTableService.returnDayId(dayName);
            this.timetableData[dayName].data = this.timetableData[dayName].data || [];
            this.timetableData[dayName].data.push(period);
        });

        /**check if timetable has any modules on selectedDay(i.e today), then only dislplay that timetable data */
        if (this.timetableData[this.selectedDay]) {
            this.selectedDayTimetable = this.timetableData[this.selectedDay].data;
        } else {
            this.selectedDayTimetable = [];
        }

    }

    onDayChange() {

        /**update the timetable      */
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
        modal.onDidDismiss((newEntry: any) => {

            // console.log("inside new on did dismiss", newEntry);
            if (newEntry) {
                this.addTimetableEntry(newEntry);
            }

        });
    }

    openEditPage(period: any, index: number) {
        const modal = this.modalCtrl.create("TimeTableEditPageManagement", { 'timeTableInfo': period });
        modal.present();
        modal.onDidDismiss((newEntry: any) => {

            if (newEntry) {

                /**when edit page is opened from item-sliding-options(i.e normal edit) ,
                 * then only we have to use the index to delete tne previous entry
                 * In case we come to main page directly from edit page(opened from edit page)
                 * then we have 'fromDoubleEditPage' key in response and also 'oldId' key 
                 * which stores the TT Id of old timetable which needs to be deleted from view */

                if (!newEntry['fromDoubleEditPage']) {
                    this.selectedDayTimetable.splice(index, 1);

                } else if (newEntry['oldId']) {

                    let dayName = newEntry.dayName.slice(0, 3);
                    if (this.timetableData[dayName] && this.timetableData[dayName].data) {
                        let oldIdPeriod = this.timetableData[dayName].data.findIndex(p => p.id == newEntry['oldId']);
                        oldIdPeriod > -1 && this.timetableData[dayName].data.splice(oldIdPeriod, 1);
                    }
                }
                this.addTimetableEntry(newEntry);
            }

        });
    }

    /**add new entry to timetable object*/
    addTimetableEntry(newEntry: any) {
        /**check if any filters are applied and add the new entry only 
         * when it satisfies the applied filters 
         */
        if (this.filters['e'] && this.filters['e'] != newEntry.employeeId) { return; }
        if (this.filters['d'] && this.filters['d'] != newEntry.departmentId) { return; }
        if (this.filters['p'] && this.filters['p'] != newEntry.programId) { return; }
        if (this.filters['y'] && this.filters['y'] != newEntry.yearId) { return; }
        if (this.filters['s'] && this.filters['s'] != newEntry.slotId) { return; }

        let dayName = newEntry.dayName.slice(0, 3);
        this.timetableData[dayName] = this.timetableData[dayName] || [];
        this.timetableData[dayName].dayId = this.timetableData[dayName].dayId || this.timeTableService.returnDayId(dayName);
        this.timetableData[dayName].data = this.timetableData[dayName].data || [];
        this.timetableData[dayName].data.push(newEntry);
    }



    onDelete(period: any, index: number) {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure to delete this timetable entry ?',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => { this.sendDeleteRequest(period, index); }
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

    sendDeleteRequest(period: any, index: number) {

        this.customService.showLoader();
        this.timeTableService.deleteTimetable(period.id)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Timetable deleted successfully');
                this.removeFromTimeTableData(index, period);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    removeFromTimeTableData(index: number, period: any) {

        /**remove from the timetable object */
        this.timetableData[this.selectedDay].data.splice(index, 1);
        /**also remove from the timetable array stored in service */
        this.timeTableService.deleteTimetableEntry(period.id);
    }

    openViewPage(period: any, index: number) {
        const modal = this.modalCtrl.create("TimeTableViewPage", { 'timeTableInfo': period });
        modal.present();
        modal.onDidDismiss((dataFromView: any) => {

            /**dataFromView is only availbale when TT is deleted from view page
             * Not availble in edit case as the timetableInfo object is updated 
             * in the view page itself
             * Hence, no need to do anything in main TT page as that updation is reflected automatically here
             */
            if (dataFromView) {
                if (dataFromView['operation'] == "del") {
                    /**remove from the timetable object */
                    this.timetableData[this.selectedDay].data.splice(index, 1);
                }
                else if (dataFromView['operation'] == "edit") {
                    if (dataFromView['dayChanged']) {

                        this.selectedDayTimetable.splice(index, 1);
                        delete dataFromView['dayChanged'];
                        this.addTimetableEntry(dataFromView);
                    }
                }
                dataFromView['operation'] && delete dataFromView['operation'];

            }
        });
    }

    showoptions(period: any) {

        const actionSheet = this.actionSheetCtrl.create({
            title: 'Select option to Create',
            buttons: [{
                text: 'Attendance',
                handler: () => {
                    this.openModal("AttendanceViewPageStudent", period);
                    // this.navcont.setRoot('AttendanceViewPageStudent');
                    // actionSheet.dismiss()
                    //     .then(() => {

                    //         const modal = this.modalCtrl.create( 'NewAttendancePageManagement',{ 'timeTableInfo': period });
                    //         modal.present();


                    //         // this.openAttendanceActionSheet(period);
                    //     }, (err) => { });

                    // return false;
                }
            },
            {
                text: 'Assignment',
                handler: () => {
                    // this.appCtrl.getRootNav().setRoot('AssignmentTabsPageStudent');

                    // this.openModal("NewAssignmentPageManagement", period);
                    this.navcont.setRoot('AssignmentTabsPageStudent');
                }
            },
            {
                text: 'Assessment',
                handler: () => {
                    // this.openModal("NewSummativePageManagement", period);
                    this.navcont.setRoot('AssessmentTabsPageStudent');
                }
            },
            {
                text: 'Messaging',
                handler: () => {
                    this.navcont.setRoot('SuggestionTabsPageStudent');
                    // this.openModal("NewPollPageManagement", period);
                }
            },
            // {
            //     text: 'Survey',
            //     handler: () => {
            //         this.openModal("NewSurveyPageManagement", period);
            //     }
            // },
            {
                text: 'Circular',
                handler: () => {
                    this.navcont.setRoot('CircularStudentListPage');
                    // this.openModal("NewCircularComponent", period);
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
        });

        this.completeAlertConfiguration('e', alert);
    }


    onDepartmentFilter() {

        if (!this.isRequiredDataAvailable('d')) { return; }

        const alert = this.alertCtrl.create({
            title: 'Choose Department',
        });

        this.completeAlertConfiguration('d', alert);
    }

    onProgramsFilter() {

        if (!this.isRequiredDataAvailable('p')) { return; }

        const alert = this.alertCtrl.create({
            title: 'Choose Program',
        });

        this.completeAlertConfiguration('p', alert);
    }
    onYearsFilter() {

        if (!this.isRequiredDataAvailable('y')) { return; }

        const alert = this.alertCtrl.create({
            title: 'Choose Year',
        });

        this.completeAlertConfiguration('y', alert);
    }

    onSlotsFilter() {

        if (!this.isRequiredDataAvailable('s')) { return; }

        const alert = this.alertCtrl.create({
            title: 'Choose Slot',
        });

        this.completeAlertConfiguration('s', alert);
    }



    /**General method : configures the alert controller by adding appropriate buttons 
     * and input radio buttons depending on the type of filter selected
     */
    completeAlertConfiguration(filter: string, alert: Alert) {

        alert.addButton({
            text: 'Cancel',
            role: 'cancel'
        });

        alert.addButton({
            text: 'Clear',
            handler: () => {

                let currentStatus: any = this.filters[filter];
                this.filters[filter] = null;
                currentStatus && this.filterAgain(); // perform filtering only if there was a filter applied 
            }
        });

        alert.addButton({
            text: 'Apply',
            handler: (id: number) => {
                /** do nothing if selection is unchanged*/
                if (this.filters[filter] == id) { return; }

                this.filters[filter] = id;
                this.filters[filter] && this.filterAgain();

            }
        });
        let list = this.timeTableService.getDataForFiltering(filter),
            selectedInputId = this.filters[filter];

        list.forEach(option => {
            alert.addInput({
                type: 'radio',
                checked: selectedInputId == option.id,
                label: option.name || `${option.startTime} - ${option.endTime}`,
                value: option.id,
            });
        });

        alert.present();
    }



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


    ngOnDestroy() {
        console.log('admin on destriy called');
        this.timeTableService.clearServiceData();

    }
}