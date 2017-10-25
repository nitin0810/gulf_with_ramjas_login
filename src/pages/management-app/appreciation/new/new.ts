import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
import { AppreciationService } from '../../../../services/appreciation.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    templateUrl: './new.html'

})

export class NewAppreciationPageManagement {

    title: string = "New appreciation";
    /**data required to create appreciation */
    years: any;
    modules: any;
    students: any;
    selectedStudentName: string;

    /**ngModal variables */
    selectedYear: any;
    selectedModule: any;
    selectedStudent: any;
    appreciationTitle: string;
    appreciationDescription: string;

    constructor(
        private viewCtrl: ViewController,
        private appreciationService: AppreciationService,
        private customService: CustomService,
        private mdlCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController
    ) {
        this.years = this.getYears();
    }

    getYears() {

        this.customService.showLoader();
        this.appreciationService.fetchYears()
            .subscribe((res: any) => {
                this.years = res;
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    getModules() {
        this.selectedModule = null;
        this.selectedStudent = null;

        this.customService.showLoader('Fetching Modules');
        this.appreciationService.fetchModules(this.selectedYear.id || this.selectedYear.yearId)
            .subscribe((res: any) => {
                this.modules = res;
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    getStudents() {

        this.selectedStudent = null;
        this.selectedStudentName = null;
        if (!this.selectedModule) { return; } // do nothing, when it is called in case selectedModule is changed to null

        this.customService.showLoader('Fetching Students List');
        this.appreciationService.fetchStudents(this.selectedYear.id || this.selectedYear.yearId, this.selectedModule.id || this.selectedModule.moduleId)
            .subscribe((res: any) => {
                this.students = res;
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openSelectionPage() {

        let searchPage = this.mdlCtrl.create("FacultySearchPage", { 'searchList': this.students, 'title': 'Student' });
        searchPage.present();
        searchPage.onDidDismiss((selected) => {
            if (selected) {

                this.selectedStudent = selected.selectedSearch;
                this.selectedStudentName = this.selectedStudent.name;
            }
        });
    }
    onSubmit() {
        // console.log(this.selectedYear);
        // console.log(this.selectedModule);
        // console.log(this.selectedStudent);


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
            studentId: this.selectedStudent.id
        };

        this.customService.showLoader();
        this.appreciationService.postAppreciation(data)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast("Appreciation Created Successfully");
                this.dismiss({
                    studentPicUrl: null,
                    studentName: this.selectedStudent.name,
                    title: this.appreciationTitle,
                    description: this.appreciationDescription,
                    createdAt: new Date()
                });
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }
}