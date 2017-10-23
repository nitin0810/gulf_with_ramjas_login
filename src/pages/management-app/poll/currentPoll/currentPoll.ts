

import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { PollService } from '../../../../services/poll.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'currentPoll',
    templateUrl: './currentPoll.html',
    styles: [` `]
})

export class CurrentPollPageManagement {

    title: string = "Poll";
    pollList: Array<any> = [];
    pageNo: number = 1;
    constructor(
        private modalCtrl: ModalController,
        private pollService: PollService,
        private customService: CustomService
    ) {
        this.fetchPollList();
    }


    fetchPollList() {

        this.customService.showLoader();
        /** 1st param 'false' indicates that expired poll list is to be fethced  */
        this.pollService.fetchPollListForManagement(false, 1)
            .subscribe((res: any) => {

                this.pollList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openNewPollModal() {
        let modal = this.modalCtrl.create("NewPollPageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {

            if (returnedData.data) {

                this.pollList.unshift(returnedData.data);
            }
        });
    }

    doRefresh(refresher: any) {

        this.pollService.fetchPollListForManagement(false, 1)
            .subscribe((res: any) => {

                this.pollList = res;
                this.pageNo = 1;
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
    }

    doInfinite(refresher: any) {

        this.pollService.fetchPollListForManagement(false, this.pageNo + 1)
            .subscribe((res: any) => {

                if (res && res.length != 0) {
                    this.pollList = this.pollList.concat(res);
                    this.pageNo++;
                }
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
    }


}
