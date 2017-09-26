

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

    constructor(
        private mdlCtrl: ModalController,
        private complaintService: ComplaintService,
        private customService: CustomService,
        private events: Events
    ) {
        this.registerStatusChange();
    }

    registerStatusChange() {

        this.events.subscribe('complaintStatusChanged', (newData: any, index: number) => {
            
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

        console.log(complaint,index);
        

        let mod = this.mdlCtrl.create("ViewComplaintPage", { viewCompl: complaint, index: index });
        mod.present();
    }

    doRefresh(refresher: any) {
        this.getComplaints(1, refresher);
        this.currentPage = 1;
    }

    doInfinite(refresher: any) {

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
