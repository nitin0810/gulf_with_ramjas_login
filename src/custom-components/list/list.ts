import { Component,Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'appreciation-list',
    templateUrl: './list.html',
    styles: [
        `
        ion-card{
            border-radius:25px;
        }
        ion-badge{
            position: relative;
            left: 50%;
            top: 23px;
            transform: translate(-50%);
            padding: 5px 25px;
        }
        `
    ]

})

export class AppreciationListComponent {

    @Input() appreciationList: any;
    defaultUserImage: string = "assets/images/user.png";
    
    constructor( ) {  }

   
}