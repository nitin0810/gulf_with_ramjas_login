import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'currentSurvey',
    templateUrl: './currentSurvey.html',
    styles: [` `]
})

export class CurrentSurveyPageManagement {

    title: string = "Survey (By Me)";

    constructor(
        private modalCtrl: ModalController
    ){};




    openNewPollModal() {

        let modal = this.modalCtrl.create("NewSurveyPageManagement");
        modal.present();
        // modal.onDidDismiss((returnedData: any) => {

        //     if (returnedData.data) {

        //         this.pollList.unshift(returnedData.data);
        //     }
        // });

    }
}