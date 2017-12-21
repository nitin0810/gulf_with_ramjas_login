import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'circular-list',
    templateUrl: './list.html',
    styles: [` `]
})

export class ListCircularPageManagement {

    @Input() circularList: any;

    constructor(
        private modalCtrl: ModalController
    ) { }

    openViewCircular(circularId: number) {

        let modal = this.modalCtrl.create("ViewCircularPageManagement", { 'circularId': circularId});
        modal.present();
    }

}
