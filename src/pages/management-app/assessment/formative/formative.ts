import { Component, ViewChild,OnInit } from '@angular/core';
import { IonicPage, ModalController, FabContainer } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AssessmentSummativePageManagement } from '../summative/summative';
import { AssessmentService } from '../../../../services/assessment.service';

@IonicPage()
@Component({
    templateUrl: './formative.html'

})

export class AssessmentFormativePageManagement extends AssessmentSummativePageManagement implements OnInit{

    @ViewChild('fab') fab: FabContainer

    title: string = "Assessment";
    constructor(
        public modalCtrl: ModalController,
        public assessmentService: AssessmentService,
        public customService: CustomService
    ) {
        super(modalCtrl, assessmentService, customService);
        this.formOrSummType = "formative";
    }

ngOnInit(){
    this.fetchAssesments();
}

    onFormativeBtn() {
        this.fab.close();
        const modal = this.modalCtrl.create("NewFormativePageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            if (returnedData) {
                this.assessmentList.unshift(returnedData);
            }
        });
    }

    onSummativeBtn() {
        this.fab.close();
        const modal = this.modalCtrl.create("NewSummativePageManagement");
        modal.present();
    }
}