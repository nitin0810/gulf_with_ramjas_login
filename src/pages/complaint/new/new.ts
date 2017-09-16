

import { Component } from '@angular/core';
import { IonicPage,ViewController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'new-compaint',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewComplaintPage {

    title: string = "New Complaint";

    constructor(
        private viewCtrl: ViewController
    ) {
    }
    dismiss(){
this.viewCtrl.dismiss();
    }
}