

import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, Events } from 'ionic-angular';
import { ComplaintMainPage } from '../../../custom-components/complaint-main/complaint-main';


@IonicPage()
@Component({
    selector: 'complaint',
    templateUrl: './complaint.html',
    styles: [` `]
})

export class ComplaintPageStudent {

    title: string = "Complaints";
    complaintList: Array<any>;
    searchInput: string = '';
    debounceDuration: number = 400;
    @ViewChild(ComplaintMainPage) complaintMainPage: ComplaintMainPage;
    // isEmptyList: boolean = false;
    // currentPage: number = 1;
    // currentPageWithSearch: number = 1;
    // currentPageWithSortFilter: number = 1;

    // searchInput: string = '';
    // searchInProcess: boolean = false;
    // isSortApplied: boolean = false;
    // isFilterApplied: boolean = false;  

    // appliedSortName: string;
    // appliedFilter: any;
    // debounceDuration: number = 400;

    constructor(
     
    ) {
        // super(mdlCtrl,complaintService,customService,events);
        // this.registerStatusChange();
        // this.complaintService.compOrSugg = "complaint";
        // this.getComplaints(1);

    }

    // registerStatusChange() {

    //     this.events.subscribe('complaintStatusChanged', (newData: any, index: number) => {

    //         this.complaintList[index] = newData;
    //     });

    //     this.events.subscribe('complaintStatusChangedInCommentsPage', (newData: any, index: number) => {

    //         this.complaintList[index] = newData;
    //     });

    // }

    onSortFilterSelect(event: any) {

        this.complaintMainPage.onSortFilterSelect(event);
        this.searchInput = '';
        
        // if (event.sortName) {

        //     if (this.isSortApplied || this.isFilterApplied) { this.currentPageWithSortFilter = 1; }

        //     this.customService.showLoader();
        //     this.complaintService.sortBy(event.sortName, 1)
        //         .subscribe((res: any) => {

        //             this.complaintList = res;
        //             this.isEmptyList = this.complaintList.length == 0;
        //             this.appliedSortName = event.sortName;
        //             this.isSortApplied = true;
        //             this.isFilterApplied = false;
        //             this.searchInput = '';
        //             this.customService.hideLoader();


        //         },
        //         (err: any) => {

        //             this.customService.hideLoader();
        //             this.customService.showToast(err.msg);

        //         });
        // } else if (event.filter) {

        //     if (this.isSortApplied || this.isFilterApplied) { this.currentPageWithSortFilter = 1; }

        //     this.customService.showLoader();
        //     this.complaintService.filterBy(event.filter, 1)
        //         .subscribe((res: any) => {

        //             this.complaintList = res;
        //             this.isEmptyList = this.complaintList.length == 0;
        //             this.appliedFilter = event.filter;
        //             this.isFilterApplied = true;
        //             this.isSortApplied = false;
        //             this.searchInput = '';
        //             this.customService.hideLoader();

        //         },
        //         (err: any) => {
        //             this.customService.hideLoader();
        //             this.customService.showToast(err.msg);

        //         });
        // }

    }

    // getComplaints(pageNo: number, refresher?: any) {

    //     if (!refresher) { this.customService.showLoader(); }

    //     this.complaintService.fetchComplaints(pageNo)
    //         .subscribe((res: any) => {

    //             this.complaintList = res;

    //             this.isEmptyList = this.complaintList.length == 0;
    //             refresher ? refresher.complete() : this.customService.hideLoader();

    //         },
    //         (err: any) => {

    //             refresher ? refresher.complete() : this.customService.hideLoader();
    //             this.customService.showToast(err.msg);

    //         });
    // }

    openNewComplaintModal() {
        this.complaintMainPage.openNewComplaintModal();
    }

    // openViewModal(complaint: any, index: number) {

    //     console.log(complaint, index);


    //     let mod = this.mdlCtrl.create("ViewComplaintPage", { viewCompl: complaint, index: index });
    //     mod.present();
    // }

    doRefresh(refresher: any) {
this.complaintMainPage.doRefresh(refresher);
this.searchInput = '';
    }

    // doInfinite(refresher: any) {

    //     if (this.searchInput.trim().length >= 1) {

    //         this.complaintService.search(this.searchInput, this.currentPageWithSearch + 1)
    //             .subscribe((res: any) => {

    //                 if (!res) {
    //                     refresher.complete();
    //                     return;
    //                 }
    //                 this.complaintList = this.complaintList.concat(res);
    //                 if (res.length != 0) { this.currentPageWithSearch++; }
    //                 refresher.complete();

    //             }, (err: any) => {

    //                 refresher.complete();
    //                 this.customService.showToast(err.msg);

    //             });
    //     } else if (this.isSortApplied || this.isFilterApplied) {

    //         if (this.isSortApplied) {
    //             this.complaintService.sortBy(this.appliedSortName, this.currentPageWithSortFilter+1)
    //                 .subscribe((res: any) => {

    //                     if (!res) {
    //                         refresher.complete();
    //                         return;
    //                     }
    //                     this.complaintList = this.complaintList.concat(res);
    //                     if (res.length != 0) { this.currentPageWithSortFilter++; }
    //                     refresher.complete();

    //                 }, (err: any) => {

    //                     refresher.complete();
    //                     this.customService.showToast(err.msg);

    //                 });

    //         }

    //         else {
    //             this.complaintService.filterBy(this.appliedFilter, this.currentPageWithSortFilter+1)
    //                 .subscribe((res: any) => {

    //                     if (!res) {
    //                         refresher.complete();
    //                         return;
    //                     }
    //                     this.complaintList = this.complaintList.concat(res);
    //                     if (res.length != 0) { this.currentPageWithSortFilter++; }
    //                     refresher.complete();

    //                 }, (err: any) => {

    //                     refresher.complete();
    //                     this.customService.showToast(err.msg);

    //                 });
    //         }
    //     }
    //     else {

    //         this.complaintService.fetchComplaints(this.currentPage + 1)
    //             .subscribe((res: any) => {

    //                 this.complaintList = this.complaintList.concat(res);
    //                 if (res.length != 0) { this.currentPage++; }
    //                 refresher.complete();
    //             },
    //             (err: any) => {

    //                 refresher.complete();
    //                 this.customService.showToast(err.msg);

    //             });
    //     }
    // }

    onSearchInput(event: any) {


        this.complaintMainPage.onSearchInput(event);
        /**Event type has been checked to remove a severe error: 
         * on clicking cross btn, the mouse event is also fired and ` if (this.searchInput.trim().length == 0)`
         * condition was becoming true, which was causing  double request to server.
         * Hence only input event is allowed 
         *  */
        // if (event.type != 'input') { return; }

        // if (this.searchInput.trim().length >= 1) {

        //     this.sendSearchRequest();
        // }

        // if (this.searchInput.trim().length == 0) {
        //     this.getComplaints(1);

        // }
    }

    // sendSearchRequest() {

    //     this.searchInProcess = true;
    //     this.complaintService.search(this.searchInput, this.currentPageWithSearch)
    //         .subscribe((res: any) => {

    //             console.log(res);
    //             this.complaintList = res;
    //             this.searchInProcess = false;
    //             this.isEmptyList = !this.complaintList || this.complaintList.length == 0;

    //             this.isSortApplied = false;
    //             this.isFilterApplied = false;
    //             this.currentPageWithSortFilter = 1;

    //         }, (err: any) => {

    //             console.log(err);
    //             this.customService.showToast(err.msg);
    //             this.searchInProcess = false;

    //         });
    // }

    onSearchClear(event: any) {

        this.complaintMainPage.onSearchClear(event);
    }

}
