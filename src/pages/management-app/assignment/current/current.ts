
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'closed-assignment',
    templateUrl: './current.html',
    styles: [` `]
})

export class CurrentAssignmentPageManagement {

    title: string = "Assignment";

    constructor(
        private modalCtrl: ModalController
    ) {

    }

    openNewAssignmentModal() {
        let modal = this.modalCtrl.create("NewAssignmentPageManagement");
        modal.present();
        modal.onDidDismiss((returnedDate: any) => {

        });
    }

    doRefresh(refresh: any) { }

    doInfinite(infinite: any) { }


}
