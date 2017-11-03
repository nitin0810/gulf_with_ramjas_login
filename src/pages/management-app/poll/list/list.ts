

import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'poll-list',
    templateUrl: './list.html',
    styles: [` `]
})

export class ListPollPageManagement {

    @Input() pollList: any;
    @Input() arePollExpired: boolean; // to make the poll editable or not

    constructor(
        private modalCtrl: ModalController
    ) { }

    openViewPoll(pollId: number) {

        let modal = this.modalCtrl.create("ViewPollPageManagement", { 'pollId': pollId, 'isExpired': this.arePollExpired });
        modal.present();
    }

}
