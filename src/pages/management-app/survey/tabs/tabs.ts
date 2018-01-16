

import { Component } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'survey',
    template: `
        <ion-tabs    color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="CURRENT" tabIcon="mic" [root]="current"></ion-tab>
        <ion-tab tabTitle="CLOSED" tabIcon="mic-off"  [root]="closed"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})
   
export class SurveyTabsPageManagement {

    current: string = "CurrentSurveyPageManagement";
    closed: string = "ClosedSurveyPageManagement";

    constructor() {       }
 
}
