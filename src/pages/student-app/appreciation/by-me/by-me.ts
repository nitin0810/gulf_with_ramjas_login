import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: './by-me.html'

})

export class AppreciationByMePageStudent {

    title: string = "Appreciations";
    constructor(
        private modalCtrl: ModalController
    ) {

    }

    openNewAppreciationModal(){
        let modal = this.modalCtrl.create("NewAppreciationPageStudent");
        modal.present();
    }
}