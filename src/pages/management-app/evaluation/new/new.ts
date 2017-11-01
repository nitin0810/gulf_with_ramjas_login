import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'new-evaluation',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewEvaluationPageManagement {

    title: string = "New evaluation";


    constructor(
        public viewCtrl: ViewController
    ) {  }


    dismiss() {
this.viewCtrl.dismiss();
    }
}