import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AssessmentSummativePageStudent } from '../summative/summative';
import { AssessmentService } from '../../../../services/assessment.service';

@IonicPage()
@Component({
    templateUrl: './formative.html'

})

export class AssessmentFormativePageStudent extends AssessmentSummativePageStudent implements OnInit {


    title: string = "Assessment";
    constructor(
        public modalCtrl: ModalController,
        public assessmentService: AssessmentService,
        public customService: CustomService
    ) {
        super(modalCtrl, assessmentService, customService);
        this.formOrSummType = "formative";
    }

    ngOnInit() {
        this.fetchAssesments();
    }


}