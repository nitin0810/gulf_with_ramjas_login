import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@IonicPage()
@Component({
    templateUrl: './new-s.html'

})

export class NewSummativePageManagement {

    title: string = "New Assessment";
    constructor(
        private viewCtrl:ViewController
    ){

    }

    dismiss(){
this.viewCtrl.dismiss();
    }
 
}