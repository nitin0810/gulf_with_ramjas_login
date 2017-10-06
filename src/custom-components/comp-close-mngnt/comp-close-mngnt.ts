
import { Component, Input } from '@angular/core';
import { IonicPage, Events, NavParams, ViewController } from 'ionic-angular';
import { CustomService } from '../../services/custom.service';
import { ComplaintService } from '../../services/complaint.service';

@IonicPage()
@Component({
    selector: 'comp-close-mngnt',
    templateUrl: './comp-close-mngnt.html',
    styles: [``]

})

export class ComplaintCloseManagementPage {

    title: string = "Close complaint";
    complaint: any;
    complaintIndex: number;

    //form variables
    rootCause: string = '';
    comment: string = '';

    complaintClosed: boolean = false;
    constructor(

        private complaintService: ComplaintService,
        private customService: CustomService,
        private navParam: NavParams,
        private viewCtrl: ViewController,
        private events: Events
    ) {

        this.complaint = this.navParam.get('complaint');
        this.complaintIndex = this.navParam.get('complaintIndex');
    }

    onSubmit() {
        console.log(this.rootCause);
        console.log(this.comment);
        let reason = {
            rca: this.rootCause,
            comment: this.comment
        };
        this.customService.showLoader();
        this.complaintService.closeComplaint(this.complaint.id, reason)
            .subscribe((res: any) => {

                this.complaint = res;
                this.complaintClosed = true;
                this.customService.hideLoader();
                this.customService.showToast('Complaint closed successfully');
                this.dismiss();
            }, (err: any) => {

                this.complaintClosed = false;
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    dismiss() {

        if (this.complaintClosed) {
            this.events.publish("complaintClosed", this.complaint, this.complaintIndex);
        }
        this.viewCtrl.dismiss();
    }
}



