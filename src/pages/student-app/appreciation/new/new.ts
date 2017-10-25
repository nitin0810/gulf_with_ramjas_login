import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
import { AppreciationService } from '../../../../services/appreciation.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    templateUrl: './new.html'

})

export class NewAppreciationPageStudent {

    title: string = "New appreciation";

    /**data required to create appreciation */
    faculties: any;
    
    /**ngModal variables */
    selectedFaculty: any;
    selectedFacultyName: string;
    appreciationTitle: string;
    appreciationDescription: string;

    constructor(
        private viewCtrl: ViewController,
        private appreciationService: AppreciationService,
        private customService: CustomService,
        private mdlCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController
    ) {
        this.faculties = this.getFaculties();
    }

    getFaculties() {

        this.customService.showLoader();
        this.appreciationService.fetchFaculties()
            .subscribe((res: any) => {
                this.faculties = res;
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openSelectionPage() {

        let searchPage = this.mdlCtrl.create("FacultySearchPage", { 'searchList': this.faculties, 'title': 'Faculty' });
        searchPage.present();
        searchPage.onDidDismiss((selected) => {
            if (selected) {

                this.selectedFaculty = selected.selectedSearch;
                this.selectedFacultyName = this.selectedFaculty.facultyName + ` (${this.selectedFaculty.moduleName})`;
            }
        });
    }

    onSubmit() {
       
        console.log(this.selectedFaculty);
        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to create the appreciation ?',
            buttons: [
                {
                    text: 'Create',
                    handler: () => {
                        this.finallySubmit();
                    }
                },
                {
                    text: 'Cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }

    finallySubmit() {
        let data = {
            title: this.appreciationTitle,
            description: this.appreciationDescription,
            facultyId: this.selectedFaculty.facultyId
        };

        this.customService.showLoader();
        this.appreciationService.postAppreciationStudent(data)
        .subscribe((res:any)=>{
            this.customService.hideLoader();
            this.customService.showToast("Appreciation Created Successfully");
            this.dismiss();
        },(err:any)=>{
            this.customService.hideLoader();
            this.customService.showToast(err.msg);
        });

    }

    dismiss(res?:any) {

        this.viewCtrl.dismiss(res);
    }
}