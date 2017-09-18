

import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { ComplaintService } from '../../services/complaint.service';


@IonicPage()
@Component({
    selector: 'complaint',
    templateUrl: './complaint.html',
    styles: [` `]
})

export class ComplaintPage {

    title: string = "Complaints";

    constructor(
        private mdlCtrl: ModalController,
        private complaintService: ComplaintService
    ) { }

    getComplaints() {
        console.log("inside getCompalints");
        
        this.complaintService.fetchComplaints()
            .subscribe((res: any) => {
                console.log(res);

            },
            (err: any) => {
                console.log(err);

            });
    }

    openNewComplaintModal() {

        let mod = this.mdlCtrl.create("NewComplaintPage");
        mod.present();
    }
}