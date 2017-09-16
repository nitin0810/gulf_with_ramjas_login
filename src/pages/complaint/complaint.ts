

import { Component } from '@angular/core';
import { IonicPage, ModalController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'complaint',
    templateUrl: './complaint.html',
    styles: [` `]
})

export class ComplaintPage {

    title: string = "Complaints";

    constructor(
        private mdlCtrl: ModalController,
        ) {  }

    openNewComplaintModal() {

        let mod = this.mdlCtrl.create("NewComplaintPage");
        mod.present();
    }
}