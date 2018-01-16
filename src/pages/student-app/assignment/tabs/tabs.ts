
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'assignment',
    template: `
        <ion-tabs    color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="CURRENT" tabIcon="mic" [root]="current"></ion-tab>
        <ion-tab tabTitle="PAST" tabIcon="mic-off"  [root]="past"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})

export class AssignmentTabsPageStudent {

    current: string = "CurrentAssignmentPageStudent";
    past: string = "ClosedAssignmentPageStudent";

    constructor() { }

}
