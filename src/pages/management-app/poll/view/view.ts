
import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavController, NavParams, DateTime } from 'ionic-angular';
import { PollService } from '../../../../services/poll.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'view-poll',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewPollPageManagement {

    @ViewChild('dateTime') dateTime: DateTime;
    title: string = "view poll";
    pollId: number; // recieved from navparams
    isExpired :boolean; // recieved from navparams
    poll: any; // complete poll info to be fetched from server
    newExpiryDate: any = new Date().toISOString().substring(0, 10);
    showInfo: boolean = false;
    constructor(
        private navparam: NavParams,
        private viewCtrl: ViewController,
        private pollService: PollService,
        private customService: CustomService
    ) {
        this.pollId = this.navparam.get('pollId');
        this.isExpired =this.navparam.get('isExpired');
        this.getPollInfo();
    }

    getPollInfo() {

        this.customService.showLoader();
        this.pollService.fetchPollById(this.pollId)
            .subscribe((res: any) => {

                this.poll = res;
                this.newExpiryDate = this.poll.expiredAt;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    todayDate() {
        return new Date().toISOString().substring(0, 10);
    }

    editExpiryDate() {

        this.dateTime.open();
    }

    updateExpiryDate() {

        this.customService.showLoader();
        this.pollService.editExpiryDate({ expiredAt: this.newExpiryDate }, this.poll.id)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast("Expiry date edited successfully");
                this.poll.expiredAt = res.expiredAt; // same as this.newExpiryDate;
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}