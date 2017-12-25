

import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController} from 'ionic-angular';
import { ComplaintService } from '../../../../services/complaint.service';
import { CustomService } from '../../../../services/custom.service';



@IonicPage()
@Component({
    selector: 'new-compaint',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewComplaintPage {

    title: string = `New ${this.complaintService.compOrSugg}`;
    categories: Array<any>;


    /**form ngModel variables */
    selectedCategory: any;
    selectedSubCategory: any;
    selectedSubCategory2: any; // refer to further chosen subcategory of selectedSybCategory
    complaintTitle: string;
    complaintDescription: string;
    isAnonymous: boolean = false;

    constructor(
        private viewCtrl: ViewController,
        private complaintService: ComplaintService,
        private customService: CustomService,
        private actionSheetCtrl: ActionSheetController
    ) {
    }

    ionViewWillEnter() {

        this.customService.showToast('All fields are required to submit the form');

        let catg = JSON.parse(localStorage.getItem('complaintCategories'));
        let faculties = JSON.parse(localStorage.getItem('complaintFaculties'));
        console.log(catg);

        /*load categories and faculty list from local storage (if present), otherwise fetch from server */
        if (catg && faculties) {

            this.categories = catg;
            /**find Teaching and learning subcategory */
            let teachingCatg = this.categories.find((element) => {
                return element.id == 1;  //1 is the id of Teaching and learning subcategory
            });
            let facultySubCategory = teachingCatg.subCategory.find((element) => {
                return element.id == 3;  //1 is the id of Faculty member subcategory
            });
            facultySubCategory.subCategory = faculties;

        } else {

            this.fetchCategoriesFromServer();
        }

    }

    fetchCategoriesFromServer() {

        this.customService.showLoader();
        this.complaintService.fetchCategories()
            .subscribe((res: any) => {

                this.categories = res;
                localStorage.setItem('complaintCategories', JSON.stringify(res));
                this.getFacultyList();

            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast("Some error occured, try again later");
                this.dismiss();
            });
    }

    getFacultyList() {

        this.complaintService.fetchFacultyNames()
            .subscribe((res: any) => {

                /**find Teaching and learning subcategory */
                let teachingCatg = this.categories.find((element) => {
                    return element.id == 1;  //1 is the id of Teaching and learning subcategory
                });
                let facultySubCategory = teachingCatg.subCategory.find((element) => {
                    return element.id == 3;  //1 is the id of Faculty member subcategory
                });
                facultySubCategory.subCategory2 = res;
                this.customService.hideLoader();

                localStorage.setItem('complaintFaculties', JSON.stringify(res));


            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast("Couldn't fetch faculty list, try again");
            });
    }

    resetSubCategories() {
console.log('reset callled');

        this.selectedSubCategory = null;
        this.selectedSubCategory2 = null;
    }
    resetSubCategories2() {
        console.log('reset 2 caled');
        
        this.selectedSubCategory2 = null;
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

    submitFinally() {

        this.customService.showLoader();
        let payLoad = this.buildPayload();

        this.complaintService.submitComplaint(payLoad)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.dismiss(res);
                this.customService.showToast('Submitted successfully');

            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    buildPayload() {

        console.log('slectedSubCategry', this.selectedSubCategory.id);
        console.log('slectedSubCategry2', this.selectedSubCategory2);


        let data: any = {};
        data.anonymous = this.isAnonymous;

        if (this.selectedSubCategory.id == 3) { //in case of faculty

            data.againstCategoryId = this.selectedSubCategory.id;
            data.againstEmployeeId = this.selectedSubCategory2.facultyId;
        }
        else {

            data.againstCategoryId = this.selectedSubCategory2 ? this.selectedSubCategory2.id : this.selectedSubCategory.id;
        }
        data.title = this.complaintTitle;
        data.description = this.complaintDescription;

        return data;
    }

    dismiss(optionaldata?: any) {

        this.viewCtrl.dismiss({ data: optionaldata });
    }

}