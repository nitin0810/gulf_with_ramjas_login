import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'time-table',
    templateUrl: './main.html',
    styles: [` `]
})

export class TimeTablePageManagement {

    title: string = 'Time table';
    constructor(
        private modalCtrl: ModalController
    ) { }

    createNewTimeTable() {
        const modal = this.modalCtrl.create("NewTimeTablePageManagement");
        modal.present();
    }
}