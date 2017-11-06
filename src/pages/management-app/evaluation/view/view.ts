import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { EvaluationService } from '../../../../services/evaluation.service';

@IonicPage()
@Component({
    selector: 'view-evaluation',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewEvaluationPageManagement {

    title: string = "View evaluation";
    evaluationId: number;
    evaluation: any;
    showInfo:boolean=false;
    constructor(
        private viewCtrl: ViewController,
        private navparams: NavParams,
        private evaluationService: EvaluationService,
        private customService: CustomService
    ) {
        this.evaluationId = this.navparams.get('evaluationId');
        this.getEvaluationDetails();
    }

    getEvaluationDetails() {

        this.customService.showLoader();
        this.evaluationService.fetchEvaluationById(this.evaluationId)
            .subscribe((res: any) => {

                this.evaluation = res;
                if(typeof this.evaluation.module =="string"){this.evaluation.module = [this.evaluation.module]}
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }
}