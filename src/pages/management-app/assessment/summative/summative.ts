import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    templateUrl: './summative.html'

})

export class AssessmentSummativePageManagement {

    title: string = "Assessment";

    constructor(
        private modalCtrl: ModalController
    ) {

    }
    onFormativeBtn() {
        const modal = this.modalCtrl.create("NewFormativePageManagement");
        modal.present();
    }

    onSummativeBtn() {
        const modal = this.modalCtrl.create("NewSummativePageManagement");
        modal.present();
    }   
}