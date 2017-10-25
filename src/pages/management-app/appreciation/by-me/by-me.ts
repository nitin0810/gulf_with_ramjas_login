import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: './by-me.html'

})

export class AppreciationByMePageManagement {

    title: string = "Appreciations";
    constructor(
        private modalCtrl: ModalController
    ) {

    }

    openNewAppreciationModal(){
        let modal = this.modalCtrl.create("NewAppreciationPageManagement");
        modal.present();
    }
}