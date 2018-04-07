
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'assignment',
    template: `
        <ion-tabs    color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="" tabIcon="" [root]="current"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})

export class ElectiveTabsPageStudent {

    current: string = "CurrentElectivePageStudent";
    past: string = "ClosedElectivePageStudent";

    constructor() { }

}
