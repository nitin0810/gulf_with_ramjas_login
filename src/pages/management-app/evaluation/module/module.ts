import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { EvaluationService } from '../../../../services/evaluation.service';

@IonicPage()
@Component({
    selector: 'moduleEvaluation',
    templateUrl: './module.html',
    styles: [` `]
})

export class ModuleEvaluationPageManagement {

    title: string = "Evaluation";
    evaluationList: Array<any>;
    evaluationType: string;
    pageNo: number = 1;
    currentOrClosed: string;
    constructor(
        public modalCtrl: ModalController,
        public evaluationService: EvaluationService,
        public customService: CustomService
    ) {
        this.evaluationType = "module";
        this.currentOrClosed = "false";
    }

    ngOnInit() {
        this.getEvaluationList();
    }

    getEvaluationList(refresher?: any) {

        if (!refresher) { this.customService.showLoader(); }
        this.evaluationService.fetchEvaluation(this.evaluationType, this.currentOrClosed == "true", 1)
            .subscribe((res: any) => {

                this.evaluationList = res;
                this.pageNo = 1;
                refresher ? refresher.complete() : this.customService.hideLoader();
            }, (err: any) => {

                refresher ? refresher.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    oncurrentOrClosedChange() {

        this.getEvaluationList();
    }

    openViewEvaluation(id: number) {
        let modal = this.modalCtrl.create("ViewEvaluationPageManagement", { 'evaluationId': id });
        modal.present();
    }

    doRefresh(refresher: any) {
        this.getEvaluationList(refresher);
    }

    doInfinite(infinite: any) {

        this.evaluationService.fetchEvaluation(this.evaluationType, this.currentOrClosed == "true", this.pageNo + 1)
            .subscribe((res: any) => {

                this.evaluationList = this.evaluationList.concat(res);
                if (res.length != 0) { this.pageNo++; }
                infinite ? infinite.complete() : this.customService.hideLoader();
            }, (err: any) => {

                infinite ? infinite.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openNewEvaluationModal() {

        let modal = this.modalCtrl.create("NewEvaluationPageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            //only module evaluation is to be inserted
            if (returnedData && !returnedData.lecturer && this.evaluationList) {
                this.evaluationList.unshift(returnedData);
            }
        });
    }
}