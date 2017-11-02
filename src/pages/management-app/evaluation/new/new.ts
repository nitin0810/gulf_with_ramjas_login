import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { EvaluationService } from '../../../../services/evaluation.service';

@IonicPage()
@Component({
    selector: 'new-evaluation',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewEvaluationPageManagement {

    title: string = "New evaluation";

    /**data required to create the evaluation */
    evaluationTypesPossible: Array<string> = ["module", "lecturer"];
    moduleTemplates: Array<any>; // used to cache the data if required again while being on the same page
    lecturerTemplates: Array<any>; // same as above
    templateList: Array<any>; // holds selected template
    yearList: Array<any>;
    moduleList: Array<any>;
    lecturerList: Array<any>;
    moduleListForLecturer: Array<any>;

    /**ngModal variables */
    templateData: any;
    evaluationType: string = "module";
    selectedYear: any;
    selectedModule: any;
    selectedLecturer: any;
    slectedModuleForLecturer: any;
    expireDate: any = new Date().toISOString().substring(0, 10);

    constructor(
        public viewCtrl: ViewController,
        private customService: CustomService,
        private evaluationService: EvaluationService,
        private actionSheetCtrl: ActionSheetController
    ) {
        this.getEvaluationTemplates("module");
    }

    getEvaluationTemplates(type: string) {

        this.customService.showLoader();
        this.evaluationService.fetchEvaluationTemplate(type)
            .subscribe((res: any) => {

                if (type == "module") {
                    this.moduleTemplates = res;
                } else {
                    this.lecturerTemplates = res;
                }
                this.templateList = res;
                this.templateData = res.length != 0 && res[0]; // showing the 1st template 
                this.getYearList();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    getYearList() {

        if (this.yearList) {
            this.customService.hideLoader();
            return;
        }

        this.evaluationService.fetchYearList()
            .subscribe((res: any) => {

                this.yearList = res;
                this.customService.hideLoader();
            });
    }

    onTypeChange() {

        if (this.evaluationType == "lecturer") {
            this.selectedYear = null;
            this.selectedModule = null;
            this.moduleList = null;
        } else {

            this.selectedYear = null;
            this.selectedModule = null;
            this.moduleList = null;
            this.selectedLecturer = null;
            this.slectedModuleForLecturer = null;
            this.lecturerList = null;
            this.moduleListForLecturer = null;
        }

        // check if template list of selecte type is already present or not
        if (this.evaluationType == "module" && this.moduleTemplates) {
            this.templateList = this.moduleTemplates;
            this.templateData = this.templateList[0];
        } else if (this.evaluationType == "lecturer" && this.lecturerTemplates) {

            this.templateList = this.lecturerTemplates;
            this.templateData = this.lecturerTemplates[0];
        } else {

            this.getEvaluationTemplates(this.evaluationType);
        }
    }

    onYearChange() {

        //onYearChange() is also triggered when selectedYear is set to null, this call is to be ignored
        if (!this.selectedYear) { return; }

        if (this.evaluationType == "module") {
            this.selectedModule = null;
            this.moduleList = null;
        } else {

            this.selectedLecturer = null;
            this.slectedModuleForLecturer = null;
            this.lecturerList = null;
            this.moduleListForLecturer = null;
        }

        this.customService.showLoader();
        this.evaluationService.fetchModuleList(this.evaluationType, this.selectedYear.id)
            .subscribe((res: any) => {

                this.evaluationType == "module" ? this.moduleList = res : this.lecturerList = res;;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onLecturerChange() {

        if (!this.selectedLecturer) { return; } //similar reason as above
        this.slectedModuleForLecturer = null;
        this.moduleListForLecturer = null;

        this.customService.showLoader();
        this.evaluationService.fetchModuleListOfLecturer(this.selectedYear.id, this.selectedLecturer.lecturerId)
            .subscribe((res: any) => {

                this.moduleListForLecturer = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    todayDate() {
        return new Date().toISOString().substring(0, 10);
    }
    onSubmit() {

        console.log(this.selectedYear);
        console.log(this.selectedModule);
        console.log(this.selectedLecturer);
        console.log(this.slectedModuleForLecturer);
        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to submit the evaluation ?',
            buttons: [
                {
                    text: 'Submit',
                    handler: () => {
                        this.submitFinally();
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

    submitFinally() {

        let data = this.templateData;
        data.expiredAt = this.expireDate;

        if (this.evaluationType == "module") {
            data.yearIds = [this.selectedYear.id];
            data.moduleIds = [this.selectedModule.moduleId];
        } else {
            data.yearIds = [this.selectedYear.id];
            data.moduleIds = [this.slectedModuleForLecturer.moduleId];
            data.lecturerId = this.selectedLecturer.lecturerId;
        }

        this.customService.showLoader();
        this.evaluationService.postEvaluation(data)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Evaluation submitted successfully');
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    dismiss(res?:any) {

        this.viewCtrl.dismiss(res);
    }
}