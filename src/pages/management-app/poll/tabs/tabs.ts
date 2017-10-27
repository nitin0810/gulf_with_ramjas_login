

import { Component } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'poll',
    template: `
        <ion-tabs   class="csGrayBackground" color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="CURRENT" tabIcon="mic" [root]="current"></ion-tab>
        <ion-tab tabTitle="CLOSED" tabIcon="mic-off"  [root]="closed"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})
   
export class PollTabsPageManagement {

    title:string="Polls (By Me)";
    current: string = "CurrentPollPageManagement";
    closed: string = "ClosedPollPageManagement";

    constructor() {       }
 
}
