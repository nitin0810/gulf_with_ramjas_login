import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AssessmentService } from '../../../../services/assessment.service';

@IonicPage()
@Component({
    templateUrl: './view.html'
})

export class AssessmentViewPageManagement {

    title: string = "View";
    assessmentId: number;
    formOrSummType: string;
    assessment: any;

    constructor(
        private navparam: NavParams,
        private viewCtrl: ViewController,
        private customService: CustomService,
        private assessmentService: AssessmentService
    ) {
        this.assessmentId = this.navparam.get('assessmentId');
        this.formOrSummType = this.navparam.get('formOrSummType');
    }

    ionViewWillEnter() {

        this.customService.showLoader();
        this.assessmentService.fetchAssessmentsById(this.formOrSummType, this.assessmentId)
            .subscribe((res: any) => {

                this.assessment = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}