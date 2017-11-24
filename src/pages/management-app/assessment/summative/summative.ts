import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, ModalController, FabContainer } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AssessmentService } from '../../../../services/assessment.service';

@IonicPage()
@Component({
    templateUrl: './summative.html'

})

export class AssessmentSummativePageManagement implements OnInit {

    @ViewChild('fab') fab: FabContainer

    title: string = "Assessment";
    formOrSummType: string;

    pageNo: number = 1;
    assessmentList: Array<any>;

    constructor(
        public modalCtrl: ModalController,
        public assessmentService: AssessmentService,
        public customService: CustomService
    ) {
        this.formOrSummType = "summative";
    }

    ngOnInit() {
        this.fetchAssesments();
    }

    fetchAssesments(refresher?: any) {

        !refresher && this.customService.showLoader();
        this.assessmentService.fetchAssessments(this.formOrSummType, 1)
            .subscribe((res: any) => {

                this.assessmentList = res;
                refresher ? refresher.complete() : this.customService.hideLoader();
            }, (err: any) => {

                refresher ? refresher.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openSingleAssessment(id: number) {
        
        const modal = this.modalCtrl.create("AssessmentViewPageManagement", { 'assessmentId': id, 'formOrSummType': this.formOrSummType });
        modal.present();
    }

    doRefresh(refresher: any) {
        this.fetchAssesments(refresher);
    }

    doInfinite(infinite: any) {


        this.assessmentService.fetchAssessments(this.formOrSummType, this.pageNo + 1)
            .subscribe((res: any) => {

                this.assessmentList = this.assessmentList.concat(res);
                if (res && res.length != 0) { this.pageNo++ }
                infinite.complete();
            }, (err: any) => {

                infinite.complete();
                this.customService.showToast(err.msg);
            });
    }



    onFormativeBtn() {
        this.fab.close();
        const modal = this.modalCtrl.create("NewFormativePageManagement");
        modal.present();
    }

    onSummativeBtn() {

        this.fab.close();
        const modal = this.modalCtrl.create("NewSummativePageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            if (returnedData) {
                this.assessmentList.unshift(returnedData);
            }
        });
    }
}