
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'assignment',
    template: `
        <ion-tabs   class="csGrayBackground" color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="CURRENT" tabIcon="mic" [root]="current"></ion-tab>
        <ion-tab tabTitle="CLOSED" tabIcon="mic-off"  [root]="closed"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})

export class AssignmentTabsPageManagement {

    current: string = "CurrentAssignmentPageManagement";
    closed: string = "ClosedAssignmentPageManagement";

    constructor() { }

}
