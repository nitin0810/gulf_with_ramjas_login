

import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'currentPoll',
    templateUrl: './currentPoll.html',
    styles: [` `]
})

export class CurrentPollPageManagement {

    title: string = "Poll";

    constructor(
        private modalCtrl: ModalController
    ) { }



    openNewPollModal() {
        let modal = this.modalCtrl.create("NewPollPageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            if (returnedData.data) {

            }
        });


    }
}
