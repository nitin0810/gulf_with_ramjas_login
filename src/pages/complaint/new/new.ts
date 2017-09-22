

import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';

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
    selectedCategory: any;
    selectedSubCategory: any;
    complaintTitle: string;
    complaintDescription: string;
    facultyNames: Array<any>;
    isAnonymous: boolean = false;

    constructor(
        private viewCtrl: ViewController,
        private complaintService: ComplaintService,
        private customService: CustomService,
        private actionSheetCtrl: ActionSheetController
    ) {
    }

    ionViewWillEnter() {
        this.customService.showLoader();
        this.complaintService.fetchCategories()
            .subscribe((res: any) => {

                this.categories = res;
                this.customService.hideLoader();
                this.customService.showToast('All fields are required to submit the form');
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast("Some error occured, try again later");
                this.dismiss();
            });

    }

    checkSelectedCategory() {

        if (!this.facultyNames && this.selectedCategory.id == 2) { // 2 is the id of faculty member category
            this.getFacultyList();
        }
    }

    getFacultyList() {

        this.customService.showLoader('Fetching faculty list');
        this.complaintService.fetchFacultyNames()
            .subscribe((res: any) => {

                this.facultyNames = res;
                this.updateView(res);
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast("Couldn't fetch faculty list, try again");
            });
    }

    updateView(res: Array<any>) {

        /**updates the subcategory list as well as subcategory array of faculty members (in this.categories) */
        this.selectedCategory.subCategory = res;
    }

    onSubmit() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure to want to submit ?',
            buttons: [
                {
                    text: 'Yes',

                    handler: () => {
                       this.submitFinally();
                    }
                }, {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: () => {
                        
                    }
                }
            ]
        });

        actionSheet.present();
    }

    submitFinally(){

        this.customService.showLoader();
        let payLoad = this.buildPayload();

        this.complaintService.submitComplaint(payLoad)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.dismiss(res);
                this.customService.showToast('Complaint added successfully');

            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    buildPayload() {

        let data: any = {};
        data.anonymous = this.isAnonymous;

        if (this.selectedCategory.id == 2) { //in case of faculty

            data.againstCategoryId = this.selectedCategory.id;
            data.againstEmployeeId = this.selectedSubCategory.id;
        }
        else {

            data.againstCategoryId = this.selectedSubCategory ? this.selectedSubCategory.id : this.selectedCategory.id;
        }
        data.title = this.complaintTitle;
        data.description = this.complaintDescription;

        return data;
    }

    dismiss(optionaldata?: any) {

        this.customService.hideToast();
        this.viewCtrl.dismiss({ data: optionaldata });
    }

}