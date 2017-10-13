

import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { PollService } from '../../../../services/poll.service';
import { CustomService } from '../../../../services/custom.service';
// import {} from './';
@IonicPage()
@Component({
    selector: 'newPoll',
    templateUrl: './newPoll.html',
    styles: [` `]
})

export class NewPollPageManagement {

    title: string = "new poll";

    question: string;
    mainAudienceId: number;
    audienceList: Array<any>;









    constructor(
        private viewCtrl: ViewController,
        private pollService: PollService,
        private customService: CustomService
    ) {
        this.getRequiredData();
    }

    getRequiredData() {
        
        this.customService.showLoader();
        this.pollService.fetchPollAudience()
            .subscribe((res: any) => {

                this.audienceList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onSubmit() {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
