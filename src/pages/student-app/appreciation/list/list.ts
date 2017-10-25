import { Component,Input } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'appreciation-list',
    templateUrl: './list.html'

})

export class AppreciationListComponent {

    @Input() appreciationList: any;
    defaultUserImage: string = "assets/images/user.png";
    
    constructor(
        private modalCtrl: ModalController
    ) {

    }

   
}