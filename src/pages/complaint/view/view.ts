import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { CustomService } from '../../../services/custom.service';
import { ComplaintService } from '../../../services/complaint.service';

@IonicPage()
@Component({
    selector: 'view-compaint',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewComplaintPage {

    title = "VIEW COMPLAINT";
    complaint: any;

    constructor(
        private params: NavParams,
        private viewCtrl: ViewController
    ) {
        this.complaint = this.params.get('viewCompl');
    }

    dismiss() {
        
        this.viewCtrl.dismiss();
    }
}