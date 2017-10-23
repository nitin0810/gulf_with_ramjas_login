
import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { PollService } from '../../../../services/poll.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'view-poll',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewPollPageManagement {

    title: string = "view poll";
    pollId: number; // recieved from navparams
    poll: any; // complete poll info to be fetched from server

    constructor(
        private navparam: NavParams,
        private viewCtrl: ViewController,
        private pollService: PollService,
        private customService: CustomService
    ) {
        this.pollId = this.navparam.get('pollId');
        this.getPollInfo();
    }

    getPollInfo() {

        this.customService.showLoader();
        this.pollService.fetchPollById(this.pollId)
            .subscribe((res: any) => {

                this.poll = res;
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