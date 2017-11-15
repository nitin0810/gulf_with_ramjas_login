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

        this.fetchEvents(this.currentMonth);
    }

    /**
   1) called whenever a date with some event is selected
    */
    onEventSelected(ev: any) {
        console.log("onevent selected///////////");

    }

    fetchEvents(currentMonth: any) {
        console.log();

        this.showSpinner = true;
        this.plannerService.fetchEventsByMonth(currentMonth)
            .subscribe((res: any) => {

                this.eventSource = res;
                this.eventSource.forEach((event: any) => {
                    event.startTime = new Date(event.start);
                    event.endTime = new Date(event.end);
                    event.noOfDays = this.daysBtwnDates(event.endTime, event.startTime);
                    delete event.end;
                    delete event.start;
                });
                this.showSpinner = false;
            }, (err: any) => {
                this.showSpinner = false;
                this.customService.showToast(err.msg);
            });
    }
    daysBtwnDates(end: any, start: any) {
        console.log('inside days difff//');

        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }

    onEventItemSelect(ev: any) {
     
        const modal = this.modalCtrl.create("ViewPlannerPageManagement",{'eventId':ev.id});
        modal.present();
    }

    openNewEventModal() {

        const modal = this.modalCtrl.create("NewPlannerPageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {

            if (returnedData) {
                returnedData.startTime = new Date(returnedData.start);
                returnedData.endTime = new Date(returnedData.end);
                delete returnedData.start;
                delete returnedData.end;

                this.eventSource.push(returnedData);
                this.myCalendar.loadEvents();
            }
        });
    }
}