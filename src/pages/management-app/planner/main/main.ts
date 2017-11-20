import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { PlannerService } from '../../../../services/planner.service';
import { CalendarComponent } from "ionic2-calendar/calendar";

@IonicPage()
@Component({
    selector: 'main-planner',
    templateUrl: './main.html',
    styles: [` `]
})

export class MainPlannerPageManagement {

    @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
    viewTitle: string;
    currentMonth: any;

    /**ngModal variables */
    eventSource: Array<any>;
    currentDateSelected: any;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };
    showSpinner: boolean = false;
    isStudent: boolean = localStorage.getItem('isStudent') == "true";

    constructor(
        private modalCtrl: ModalController,
        private plannerService: PlannerService,
        private customService: CustomService
    ) { }

    /**
    called on each slide (whenever we move to next/previous month)
     */
    onViewTitleChanged(title: string) {
        // console.log("onViewTitleChanged called//////////", title);
        this.viewTitle = title;
    }

    /**
    1) called on each slide (whenever we move to next/previous month) 
    2) called whenever a date is selected
     */
    onCurrentDateChanged(date: Date) {

        // console.log("oncurrentdatechanged called/////////", date);
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        this.currentMonth = date.getFullYear() + '-' + month;
        console.log(this.currentMonth);

    }

    /**
    1) called on each slide (whenever we move to next/previous month) 
    2) called whenever a date is selected,
    3) called after onCurrentDateChanged
     */
    onTimeSelected(ev: any) {

        /**format of ev is: 
        disabled  :     boolean
        events    : any[]
        selectedTime  :Date
        */
        this.currentDateSelected = ev;
    }

    /**
    1) called on each slide (whenever we move to next/previous month) only when queryMode is set to remote
     */
    reloadSource(ev: any) {

        // console.log("reload source (range changed )callled////////", ev);

        //service to fetch the events to be called here
        //parameter ev is of no use to us here, instead this.currentMonth is for sending request

        this.currentDateSelected && (this.currentDateSelected.events = []); //empty the list of events, so that no event list is visisble until respons from server is reveived
        this.fetchEvents(this.currentMonth);
    }


    fetchEvents(currentMonth: any) {

        this.showSpinner = true;
        this.plannerService.fetchEventsByMonth(currentMonth)
            .subscribe((res: any) => {

                this.eventSource = res;
                this.eventSource.forEach((event: any) => {
                    event.startTime = new Date(event.start);
                    event.endTime = new Date(event.end);
                    event.noOfDays = this.daysBtwnDates(event.endTime, event.startTime);

                });
                this.showSpinner = false;
            }, (err: any) => {
                this.showSpinner = false;
                this.customService.showToast(err.msg);
            });
    }

    daysBtwnDates(end: any, start: any) {

        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }

    onEventItemSelect(ev: any, index: number) {

        const modal = this.modalCtrl.create("ViewPlannerPageManagement", { 'eventId': ev.id });
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            console.log('in main ondididismiss', returnedData);

            if (returnedData && returnedData.op == "deleted") {

                this.currentDateSelected.events.splice(index, 1);

            } else if (returnedData && returnedData.op == "edited") {

                this.currentDateSelected.events[index].startTime = returnedData.newData.startTime;
                this.currentDateSelected.events[index].endTime = returnedData.newData.endTime;
                this.currentDateSelected.events[index].title = returnedData.newData.title;
                this.currentDateSelected.events[index].noOfDays = this.daysBtwnDates(returnedData.newData.endTime, returnedData.newData.startTime);

            }
        });
    }

    openNewEventModal() {

        const modal = this.modalCtrl.create("NewPlannerPageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {

            if (returnedData) {
                returnedData.startTime = new Date(returnedData.start);
                returnedData.endTime = new Date(returnedData.end);

                this.eventSource.push(returnedData);
                this.myCalendar.loadEvents();
            }
        });
    }

    onTimeLineBtn() {

        const modal = this.modalCtrl.create("TimelinePageManagement");
        modal.present();
        modal.onDidDismiss((returnData: any) => {
            if (returnData) {
                /**in case of true only we need to refresh the eventSource data */
                this.fetchEvents(this.currentMonth);
            }
        });
    }
}