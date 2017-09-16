

import { Component } from '@angular/core';
import { IonicPage, ModalController,NavController } from 'ionic-angular';

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
        private navCtrl: NavController
    ) {    }

    openNewComplaintModal() {
        // let mod = this.mdlCtrl.create("NewComplaintPage");
        let mod = this.navCtrl.push("NewComplaintPage");
        
        // mod.present();
    }
}