
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'closed-assignment',
    templateUrl: './closed.html',
    styles: [` `]
})

export class ClosedAssignmentPageManagement {

    title: string = "Assignment";

    constructor(
        private modalCtrl: ModalController
    ) {

    }



    doRefresh(refresh: any) { }

    doInfinite(infinite: any) { }
    
   
}
