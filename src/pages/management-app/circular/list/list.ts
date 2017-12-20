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
    @Input() areCircularExpired: boolean; // to make the circular editable or not

    constructor(
        private modalCtrl: ModalController
    ) { }

    openViewCircular(circularId: number) {

        let modal = this.modalCtrl.create("ViewCircularPageManagement", { 'circularId': circularId, 'isExpired': this.areCircularExpired });
        modal.present();
    }

}
