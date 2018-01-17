import { ViewController, IonicPage} from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
    selector: 'popover',
    templateUrl: './popover.html',
    styles: [` `]
})

export class EditDeletePopoverPage {

    constructor(
        private viewCtrl:ViewController
    ){  }

    edit(){
        this.viewCtrl.dismiss("edit");
    }

    delete(){
        this.viewCtrl.dismiss("delete");
    }
}