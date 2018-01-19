

import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'evaluation',
    template: `
        <ion-tabs    color="primary" tabsLayout='icon-start'>
        <ion-tab tabTitle="MODULE" tabIcon="book" [root]="module"></ion-tab>
        <ion-tab tabTitle="LECTURER" tabIcon="person"  [root]="lecturer"></ion-tab>
        </ion-tabs>
                `,
    styles: [` `]
})
   
export class EvaluationTabsPageManagement {
    
    module: string = "ModuleEvaluationPageManagement";
    lecturer: string = "LecturerEvaluationPageManagement";

    constructor() {       }
 
}
