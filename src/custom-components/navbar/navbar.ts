
import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component( {
    selector: 'nl-navbar',
    template: `
        <ion-navbar color="primary">
            <ion-toolbar>
                <button ion-button menuToggle>
                    <ion-icon name="menu"></ion-icon>
                </button>
         <ion-title >
          <span>{{title | uppercase}}</span>
        </ion-title>
          <ion-buttons end>
            <ng-content></ng-content>
            </ion-buttons>
            </ion-toolbar>
        </ion-navbar>
            `,
     styles: [``]

  
})

export class CustomNavbar {

    @Input() title: string;
    
    constructor() { }
}