

import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { PollService } from '../../../../services/poll.service';

@IonicPage()
@Component({
    selector: 'closedPoll',
    templateUrl: './closedPoll.html',
    styles: [` `]
})

export class ClosedPollPageManagement {

    title: string = "Poll";
    pollList: Array<any>;
    pageNo: number = 1;

    constructor(
        private customService: CustomService,
        private pollService: PollService
    ) {
        this.fetchPollList();
    }


    fetchPollList() {

        this.customService.showLoader();
        /** 1st param 'true' indicates that expired poll list is to be fethced  */
        this.pollService.fetchPollListForManagement(true, 1)
            .subscribe((res: any) => {

                this.pollList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    doRefresh(refresher: any) {

        this.pollService.fetchPollListForManagement(true, 1)
            .subscribe((res: any) => {

                this.pollList = res;
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
    }

    doInfinite(refresher: any) {

        this.pollService.fetchPollListForManagement(true, this.pageNo + 1)
            .subscribe((res: any) => {

                if (res && res.length != 0) {
                    this.pollList.push(res);
                    this.pageNo++;
                }
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
    }
}
