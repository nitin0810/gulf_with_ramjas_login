
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PollService } from '../../services/poll.service';
import { CustomService } from '../../services/custom.service';

@IonicPage()
@Component({
    selector: 'poll',
    templateUrl: './poll.html',

    styles: [``]


})

export class PollPage {

    title: string = "Poll";
    pollList: Array<any>;
    isPollListEmpty: boolean = false;

    constructor(
        private pollService: PollService,
        private customService: CustomService
    ) {
        this.customService.showLoader();
        this.pollService.fetchPollList(1)
            .subscribe((res: any) => {
                this.pollList = res;
                this.customService.hideLoader();
                this.isPollListEmpty = this.pollList.length == 0;
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }
}