

import { Component} from '@angular/core';

import { MenuController} from 'ionic-angular';
@Component({
    selector: 'no-internet',
    template: `
        <ion-header>
             <nl-navbar [title]="title"></nl-navbar>
        </ion-header>
         <ion-content >
            <ion-list class="no-comment">
                <ion-icon name="cloud"></ion-icon>
                <br>NO INTERNET CONNECTION
            </ion-list>
            <button ion-button color="light" icon-start class="csCenter">
                <ion-icon name="refresh"></ion-icon>Tap to retry
            </button>
        </ion-content>
            `,
    styles: [`

  `]
})
export class NoInternet {
    title: string = "No Internet";

    constructor(public menuCtrl: MenuController) {
        this.menuCtrl.enable(false);
    }
}