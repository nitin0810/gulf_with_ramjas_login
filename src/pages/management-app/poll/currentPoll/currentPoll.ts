

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

    title: string = "Poll (By Me)";
    pollList: Array<any> = [];
    pageNo: number = 1;
    pageNoWithSearch: number = 1;
    searchInput: string = '';
    searchInProcess: boolean = false;
    debounceDuration: number = 400;

    constructor(
        private modalCtrl: ModalController,
        private pollService: PollService,
        private customService: CustomService
    ) {
        this.fetchPollList();
        /**Delete the data required to make the new poll, so that updated data can be used in case,
         * new poll is to be created.
         * This functionality has no relation with the current polls. Data has been cleared here so that 
         * same data can be used in case multiple polls to be created
         */
        this.clearNewPollData();
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

    onSearchInput(event: any) {

        /** Event type has been checked to remove a severe error: 
           * on clicking cross btn, the mouse event is also fired and ` if (this.searchInput.trim().length == 0)`
           * condition was becoming true, which was causing  double request to server.
           * Hence only input event is allowed 
           *  */
        if (event.type != 'input') { return; }

        if (this.searchInput.trim().length >= 1) {

            this.sendSearchRequest();
        }

        if (this.searchInput.trim().length == 0) {

            this.fetchPollList();
        }
    }

    sendSearchRequest() {

        this.searchInProcess = true;
        this.pageNoWithSearch = 1;
        this.pollService.searchManagement(false, this.pageNoWithSearch, this.searchInput)
            .subscribe((res: any) => {

                this.pollList = res;
                this.searchInProcess = false;
            }, (err: any) => {

                this.customService.showToast(err.msg);
                this.searchInProcess = false;

            });
    }

    onSearchClear(event: any) {

        this.fetchPollList();
    }

    doRefresh(refresher: any) {

        this.pollService.fetchPollListForManagement(false, 1)
            .subscribe((res: any) => {

                this.pollList = res;
                this.pageNo = 1;
                this.pageNoWithSearch = 1;
                this.searchInput = '';
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
    }

    doInfinite(refresher: any) {

        if (this.searchInput.trim().length == 0) {

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
        } else {

            this.pollService.searchManagement(false, this.pageNoWithSearch + 1, this.searchInput)
                .subscribe((res: any) => {

                    if (res && res.length != 0) {
                        this.pollList = this.pollList.concat(res);
                        this.pageNoWithSearch++;
                    }
                    refresher.complete();
                }, (err: any) => {

                    refresher.complete();
                    this.customService.showToast(err.msg);
                });;
        }


    }

    clearNewPollData() {

        /**following items have been stored in newPoll module */
        localStorage.removeItem('pollAudienceList');
        localStorage.removeItem('pollOptionTypes');
        localStorage.removeItem('pollOptionLimit');
        localStorage.removeItem('pollDepartmentList');
        localStorage.removeItem('pollProgramList');
        localStorage.removeItem('pollYearList');
        localStorage.removeItem('pollModuleYears');

    }

}
