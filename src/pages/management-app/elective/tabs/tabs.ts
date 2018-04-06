import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'circular',
    template: `
        <ion-tabs    color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="" tabIcon="" [root]="current"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})
   
export class ElectiveTabsPageManagement {

    current: string = "CurrentElectivePageComponent";
    
    constructor() {       }
 
}
