

import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { CustomService } from '../../../services/custom.service';
import { ComplaintService } from '../../../services/complaint.service';

@IonicPage()
@Component({
    selector: 'new-compaint',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewComplaintPage {

    title: string = "New Complaint";
    categories: Array<any>;
    
    /**form ngModel variables */
    selectedCategory:any;
    selectedSubCategory:any;
    compalaintTitle: string;
    complaintDescription:string;

    constructor(
        private viewCtrl: ViewController,
        private complaintService: ComplaintService,
        private customService: CustomService
    ) {
    }

    ionViewWillEnter() {
        console.log("inside ion view......");
        this.complaintService.fetchCategories()
            .subscribe((res: any) => {

                this.categories = res;
            }, (err: any) => {

                this.customService.showToast("Some error occured, try again later");
                this.dismiss();
            });

    }
    dismiss() {

        this.viewCtrl.dismiss();
    }
}