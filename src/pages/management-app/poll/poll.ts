

import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'poll',
    template: `
        <ion-tabs #myTabs1  class="csGrayBackground" color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="CURRENT" tabIcon="mic" [root]="current"></ion-tab>
        <ion-tab tabTitle="CLOSED" tabIcon="mic-off"  [root]="closed"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})
   
export class PollTabsManagement {
    @ViewChild('myTabs1') tabRef: Tabs;
    current: string = "CurrentPollPageManagement";
    closed: string = "ClosedPollPageManagement";

    constructor() {       }
    ionViewDidEnter() {
        console.log('poll tab did enter called/////');
        
        // this.tabRef.select(0);
        console.log(this.tabRef.getByIndex(0));
    }
}
