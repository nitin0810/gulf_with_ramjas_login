import { Component } from '@angular/core';
import { IonicPage,ModalController  } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';


@IonicPage()
@Component({
    selector: 'main-planner',
    templateUrl: './main.html',
    styles: [` `]
})

export class MainPlannerPageManagement {

    viewTitle: string;
    eventSource = [];
    currentDate: Date;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }

    constructor(
        private modalCtrl:ModalController
    ) { }

    /**
    called on each slide (whenever we move to next/previous month)
     */
    onViewTitleChanged(title: string) {
        console.log("onViewTitleChanged called//////////", title);
        this.viewTitle = title;
    }

    /**
    1) called on each slide (whenever we move to next/previous month) 
    2) called whenever a date is selected
     */
    onCurrentDateChanged(date: Date) {
        console.log("oncurrentdatechanged called/////////", date);
        this.currentDate = date;
    }

    /**
    1) called on each slide (whenever we move to next/previous month) 
    2) called whenever a date is selected,
    3) called after onCurrentDateChanged
     */
    onTimeSelected(ev: { selectedTime: Date, events: any[] }) {
        console.log("time(date) slected called///////", ev);

    }

    /**
    1) called on each slide (whenever we move to next/previous month) only when queryMode is set to remote
     */
    reloadSource(ev: any) {
        console.log("reload source (range changed )callled////////");
        //service to fetch the events to be called here

    }

    /**
   1) called whenever a date with some event is selected
    */
    onEventSelected(ev: any) {
        console.log("onevent selected///////////");

    }

    openNewEventModal(){

        const modal = this.modalCtrl.create("NewPlannerPageManagement");
        modal.present();
    }
}