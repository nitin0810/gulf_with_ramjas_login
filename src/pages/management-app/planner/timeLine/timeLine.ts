
import { ViewController, IonicPage, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CustomService } from '../../../../services/custom.service';
import { PlannerService } from '../../../../services/planner.service';
import { reflector } from '@angular/core/src/reflection/reflection';




@IonicPage()
@Component({
    selector: 'timeLine',
    templateUrl: './timeLine.html',
    styles: [` `]
})

export class TimelinePageManagement {

    title: string = "Timeline";
    eventList: Array<any>;
    pageNo: number = 1;

    constructor(
        private viewCtrl: ViewController,
        private customService: CustomService,
        private plannerService: PlannerService,
        private modalCtrl: ModalController
    ) {

    }

    ngOnInit() {
        this.fetchEvents();
    }

    fetchEvents(refresher?: any) {
        if (!refresher) { this.customService.showLoader(); }
        this.plannerService.fetchTimeline(1)
            .subscribe((res: any) => {

                this.eventList = res;
                refresher ? refresher.complete() : this.customService.hideLoader();
            }, (err: any) => {

                refresher ? refresher.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onEventClick(id: number) {
        const modal = this.modalCtrl.create("ViewPlannerPageManagement", { 'eventId': id });
        modal.present();
    }

    doRefresh(refresher: any) {
        this.fetchEvents(refresher);
    }

    doInfinite(infinite: any) {

        this.plannerService.fetchTimeline(this.pageNo + 1)
            .subscribe((res: any) => {

                this.eventList = this.eventList.concat(res);
                if (res && res.length != 0) { this.pageNo++; }
                infinite.complete();
            }, (err: any) => {

                infinite.complete();
                this.customService.showToast(err.msg);
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}