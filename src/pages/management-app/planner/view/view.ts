import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavParams } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { PlannerService } from '../../../../services/planner.service';


@IonicPage()
@Component({
    selector: 'view-planner',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewPlannerPageManagement {

    title: string = "View Event";
    eventId: number;
    event: any;


    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private plannerService: PlannerService,
        private customService: CustomService
    ) {
        this.eventId = this.navParams.get('eventId');
    }

    ionViewWillEnter() {

        this.customService.showLoader();
        this.plannerService.fetchEventsById(this.eventId)
            .subscribe((res: any) => {
                this.event = res;
                this.event.startTime = new Date(res.start);
                this.event.endTime = new Date(res.end);
                // this.event.noOfDays = this.daysBtwnDates(res.endTime, res.startTime);
                delete this.event.end;
                delete this.event.start;

                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}   
