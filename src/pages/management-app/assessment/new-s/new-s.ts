import { Component } from '@angular/core';
import { IonicPage, ModalController, ViewController, ActionSheetController, NavParams } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AssessmentService } from '../../../../services/assessment.service';

@IonicPage()
@Component({
    templateUrl: './new-s.html'

})

export class NewSummativePageManagement {

    title: string = "New Assessment";

    /**ngModal variables */
    assessmentTitle: string;
    selectedYear: any;
    selectedModule: any;
    modulesForSelectedYear: Array<any>;
    selectedStudent: any;
    studentsForSelectedYearModule: any;
    weighting: string;
    selectedAssessmentType: any;
    feedbackEntries: Array<{ title: string, description: string }> = [{ title: "", description: "" }];

    /**data required to create the assessment */
    years: Array<any>;
    modules: any = {}; // stores the modules(array) for each yearId
    students: any = {};  // stores studentList(array) for each combination of yearId and moduleId
    assessmentTypes: Array<any> = []; //stores the type of assessment available for formative assesment


    /**This page may also be opened from timetable page
     * In that case moduleId and yearId will be fixed, which will be coming from timetable page
     * Below object stores that data 
     */
    private timetableInfo: any;
    /**in timetable case, module and year select is to be disabled */
    myDisabled: boolean = false;


    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private actionSheetController: ActionSheetController,
        private assessmentService: AssessmentService,
        private customService: CustomService
    ) {
        this.setTimeTableInfo(this.navParams.get('timeTableInfo'));
    }

    setTimeTableInfo(tt: any) {
        /**timetableInfo will remian undefined if this page is
         * opened nomally i.e not from TimeTablePage
         */
        this.timetableInfo = tt;
    }

    ionViewWillEnter() {
        this.timetableInfo ? this.checkTimetableInfoAndSetData() : this.fetchYears();
    }

    /**check timeTableInfo and if available, handle the data accordingly 
* 1) restrict the possible yearList and moduleList,
* 2) preset the selected year and modules
*/
    checkTimetableInfoAndSetData() {

        this.selectedYear = { yearName: this.timetableInfo.yearName, yearId: this.timetableInfo.yearId };
        this.years = [this.selectedYear];
        this.selectedModule = { moduleId: this.timetableInfo.moduleId, moduleName: this.timetableInfo.moduleName };
        this.modulesForSelectedYear = [this.selectedModule];
        this.modules[this.timetableInfo.yearId] = this.modulesForSelectedYear;
        this.myDisabled = true;
        /**fetch students according to selected year and module */
        this.fetchStudents();
    }

    fetchYears() {

        this.customService.showLoader();
        this.assessmentService.fetchYears()
            .subscribe((res: any) => {

                this.years = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onYearChange() {

        this.modulesForSelectedYear = null;
        this.studentsForSelectedYearModule = null;
        this.selectedStudent = null;
        this.selectedAssessmentType = null;

        /**check if the module list of selected year is already availble or not */
        if (this.modules[this.selectedYear.id || this.selectedYear.yearId]) {
            this.modulesForSelectedYear = this.modules[this.selectedYear.id || this.selectedYear.yearId];
        } else {
            this.fetchModules();
        }
    }

    onModuleChange() {

        this.studentsForSelectedYearModule = null;
        this.selectedAssessmentType = null;
        /**check if the studenet list of selected year&Module is already availble or not */
        if (this.students[this.selectedYear.id || this.selectedYear.yearId] && this.students[this.selectedYear.id || this.selectedYear.yearId][this.selectedModule.id || this.selectedModule.moduleId]) {
            this.studentsForSelectedYearModule = this.students[this.selectedYear.id || this.selectedYear.yearId][this.selectedModule.id || this.selectedModule.moduleId];
        } else {
            this.fetchStudents();
        }
    }

    onStudentSelection() {
        if (this.assessmentTypes.length == 0) {
            this.fetchAssessmentTypes(); //only called first time 
        }
    }

    fetchModules() {

        this.customService.showLoader();
        this.assessmentService.fetchModules(this.selectedYear.id || this.selectedYear.yearId)
            .subscribe((res: any) => {

                this.modules[this.selectedYear.id || this.selectedYear.yearId] = res;
                this.modulesForSelectedYear = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    fetchStudents() {

        this.customService.showLoader();
        this.assessmentService.fetchStudents('summative', this.selectedYear.id || this.selectedYear.yearId, this.selectedModule.id || this.selectedModule.moduleId)
            .subscribe((res: any) => {

                !this.students[this.selectedYear.id || this.selectedYear.yearId] && (this.students[this.selectedYear.id || this.selectedYear.yearId] = {});
                this.students[this.selectedYear.id || this.selectedYear.yearId][this.selectedModule.id || this.selectedModule.moduleId] = res;
                this.studentsForSelectedYearModule = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    fetchAssessmentTypes() {

        this.customService.showLoader();
        this.assessmentService.fetchAssessmentTypes('summative')
            .subscribe((res: any) => {

                this.assessmentTypes = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    checkMarks(value: any) {

        if (isNaN(value)) {
            this.weighting = "";
            this.customService.showToast('Only Numeric value is allowed');
            return;
        }
        if (parseInt(value) < 0 || parseInt(value) > 100) {
            this.weighting = "";
            this.customService.showToast('Enter number between 0 and 100');
        }

    }

    onAddEntry() {
        this.feedbackEntries.push({ title: "", description: "" });
    }

    onDeleteEntry(index: number) {
        this.feedbackEntries.length >= 2 && this.feedbackEntries.splice(index, 1);

    }

    onSubmit() {


        const actionSheet = this.actionSheetController.create({

            title: 'Are you sure to submit the Assessment ?',
            buttons: [
                {
                    text: 'Submit',
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

        let payLoad = this.buildPayload();

        this.customService.showLoader();
        this.assessmentService.submitAssessment('summative', payLoad)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Assessment created successfully');
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    buildPayload() {

        // console.log('years:', this.years);
        // console.log('modules', this.modules);
        // console.log('stuents', this.students);
        // console.log('sleecteyy0', this.selectedYear);
        // console.log('slecedModule', this.selectedModule);
        // console.log('sleecetStudent', this.selectedStudent);

        let data = {
            title: this.assessmentTitle,
            yearId: this.selectedYear.id || this.selectedYear.yearId,
            moduleId: this.selectedModule.id || this.selectedModule.moduleId,
            studentId: this.selectedStudent.id,
            weighting: this.weighting,
            assesmentTypeId: this.selectedAssessmentType.id,
            feedbacks: this.feedbackEntries
        };

        return data;
    }

    dismiss(res?: any) {
        this.viewCtrl.dismiss(res);
    }

}