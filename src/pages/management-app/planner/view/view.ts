import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavParams, ModalController } from 'ionic-angular';

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
    eventChange: string;

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController,
        private plannerService: PlannerService,
        private customService: CustomService
    ) {
        this.eventId = this.navParams.get('eventId');
    }

    ngOnInit() {

        this.customService.showLoader();
        this.plannerService.fetchEventsById(this.eventId)
            .subscribe((res: any) => {
                this.event = res;
                this.event.startTime = new Date(res.start);
                this.event.endTime = new Date(res.end);
                // this.event.noOfDays = this.daysBtwnDates(res.endTime, res.startTime);
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    onEditBtn() {

        const modal = this.modalCtrl.create("EditPlannerPageManagement", { 'event': this.event });
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            if (returnedData) {
console.log('inside view ts ondiddismiss',returnedData);

                this.event = returnedData;
                /**reassigning the startTime and endTime in required format */
                this.event.startTime = new Date(this.event.start);
                this.event.endTime = new Date(this.event.end);
                this.eventChange = "edited";
            }
        });
    }

    onDeleteBtn() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to delete the event ?',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        this.deleteFinally();
                    }

                },
                {
                    text: 'Cancel',
                    handler: () => { }
                }
            ]
        });

        actionSheet.present();

    }

    deleteFinally() {

        this.customService.showLoader();
        this.plannerService.deleteEvent(this.eventId)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.eventChange = "deleted";
                this.dismiss();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss() {

        if (this.eventChange) {
            this.viewCtrl.dismiss({ 'op': this.eventChange,'newData':this.event });//newData is only to be used in edited case
        } else {
            this.viewCtrl.dismiss();
        }

    }
}   
