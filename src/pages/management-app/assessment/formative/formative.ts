import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController,FabContainer } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    templateUrl: './formative.html'

})

export class AssessmentFormativePageManagement {

    @ViewChild('fab') fab:FabContainer

    title: string = "Assessment";
    constructor(
        private modalCtrl: ModalController
    ) {

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
    }
}