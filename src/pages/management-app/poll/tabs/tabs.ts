

import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'poll',
    template: `
        <ion-tabs    color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="CURRENT" tabIcon="mic" [root]="current"></ion-tab>
        <ion-tab tabTitle="CLOSED" tabIcon="mic-off"  [root]="closed"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})
   
export class PollTabsPageManagement {

    current: string = "CurrentPollPageManagement";
    closed: string = "ClosedPollPageManagement";

    constructor() {       }
 
}
