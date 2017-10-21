

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
    pollList: Array<any> = [];
    constructor(
        private modalCtrl: ModalController
    ) {
        // console.log('current construtor callded');

    }



    openNewPollModal() {
        let modal = this.modalCtrl.create("NewPollPageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            console.log("ondiddismaiis called////",returnedData);
            
            if (returnedData.data) {

                this.pollList.unshift(returnedData.data);
            }
        });


    }
}
