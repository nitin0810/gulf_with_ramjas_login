

import { Component } from '@angular/core';
import { IonicPage, ModalController, Events } from 'ionic-angular';
import { ComplaintService } from '../../services/complaint.service';
import { CustomService } from '../../services/custom.service';


@IonicPage()
@Component({
    selector: 'complaint',
    templateUrl: './complaint.html',
    styles: [` `]
})

export class ComplaintPage {

    title: string = "Complaints";
    complaintList: Array<any>;
    isEmptyList: boolean = false;
    currentPage: number = 1;
    currentPageWithSearch: number = 1;

    searchInput: string = '';
    searchInProcess: boolean = false;
    debounceDuration:number = 400;

    constructor(
        public mdlCtrl: ModalController,
        public complaintService: ComplaintService,
        public customService: CustomService,
        public events: Events
    ) {
        this.registerStatusChange();
        this.complaintService.compOrSugg = "complaint";

    }

    registerStatusChange() {

        this.events.subscribe('complaintStatusChanged', (newData: any, index: number) => {

            this.complaintList[index] = newData;
        });

        this.events.subscribe('complaintStatusChangedInCommentsPage', (newData: any, index: number) => {

            this.complaintList[index] = newData;
        });
    }

    ionViewWillEnter() {

        this.getComplaints(1);
    }

    getComplaints(pageNo: number, refresher?: any) {

        if (!refresher) { this.customService.showLoader(); }

        this.complaintService.fetchComplaints(pageNo)
            .subscribe((res: any) => {

                this.complaintList = res;
                console.log('suggestions', this.complaintList);

                this.isEmptyList = this.complaintList.length == 0;
                refresher ? refresher.complete() : this.customService.hideLoader();

            },
            (err: any) => {

                refresher ? refresher.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);

            });
    }

    openNewComplaintModal() {

        let mod = this.mdlCtrl.create("NewComplaintPage");
        mod.present();

        mod.onDidDismiss((recentlyAddedComplaint?: any) => {
            console.log(recentlyAddedComplaint);

            if (recentlyAddedComplaint && recentlyAddedComplaint.data) {

                this.complaintList.unshift(recentlyAddedComplaint.data);
            }
        });
    }

    openViewModal(complaint: any, index: number) {

        console.log(complaint, index);


        let mod = this.mdlCtrl.create("ViewComplaintPage", { viewCompl: complaint, index: index });
        mod.present();
    }

    doRefresh(refresher: any) {
        this.getComplaints(1, refresher);
        this.currentPage = 1;
        this.searchInput = '';
    }

    doInfinite(refresher: any) {

        if (this.searchInput.trim().length >= 2) {

            this.complaintService.search(this.searchInput, this.currentPageWithSearch + 1)
                .subscribe((res: any) => {
                    
                    if (!res) {
                        refresher.complete();
                        return;
                    }
                    this.complaintList = this.complaintList.concat(res);
                    if (res.length != 0) { this.currentPageWithSearch++; }
                    refresher.complete();

                }, (err: any) => {

                    refresher.complete();
                    this.customService.showToast(err.msg);

                });
        } else {

            this.complaintService.fetchComplaints(this.currentPage + 1)
                .subscribe((res: any) => {

                    this.complaintList = this.complaintList.concat(res);
                    if (res.length != 0) { this.currentPage++; }
                    refresher.complete();
                },
                (err: any) => {

                    refresher.complete();
                    this.customService.showToast(err.msg);

                });
        }
    }

    onSearchInput(event: any) {

        /**Event type has been checked to remove a severe error: 
         * on clicking cross btn, the mouse event is also fired and ` if (this.searchInput.trim().length == 0)`
         * condition was becoming true, which was causing  double request to server.
         * Hence only input event is allowed 
         *  */
        if (event.type != 'input') { return; }

        if (this.searchInput.trim().length >= 2) {

            this.sendSearchRequest();
        }

        if (this.searchInput.trim().length == 0) {
            this.getComplaints(1);

        }
    }

    sendSearchRequest() {

        this.searchInProcess = true;
        this.complaintService.search(this.searchInput, this.currentPageWithSearch)
            .subscribe((res: any) => {

                console.log(res);
                this.complaintList = res;
                this.searchInProcess = false;
                this.isEmptyList = !this.complaintList || this.complaintList.length == 0;

            }, (err: any) => {

                console.log(err);
                this.customService.showToast(err.msg);
                this.searchInProcess = false;

            });
    }

    onSearchClear(event: any) {

        this.getComplaints(1);
    }
}
