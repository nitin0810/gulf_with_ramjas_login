import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { ModuleEvaluationPageManagement } from '../module/module';
import { EvaluationService } from '../../../../services/evaluation.service';

@IonicPage()
@Component({
    selector: 'LecturerEvaluation',
    templateUrl: './Lecturer.html',
    styles: [` `]
})

export class LecturerEvaluationPageManagement extends ModuleEvaluationPageManagement {

    title: string = "Evaluation";
    evaluationList: Array<any>;
    evaluationType: string;
    pageNo: number = 1;
    currentOrClosed: string;
    constructor(
        public modalContoller: ModalController,
        public evaluationService: EvaluationService,
        public customService: CustomService
    ) {
        super(modalContoller,evaluationService,customService);
        this.evaluationType = "lecturer";
        this.currentOrClosed = "false";
    }

    ngOnInit() {
        this.getEvaluationList();
    }
}