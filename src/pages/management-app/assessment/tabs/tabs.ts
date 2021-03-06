import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-tabs  color="primary" tabsLayout='icon-start'>
    <ion-tab tabTitle="Summative" tabIcon="folder" [root]="Summative"></ion-tab>
    <ion-tab tabTitle="Formative" tabIcon="folder"  [root]="Formative"></ion-tab>
    </ion-tabs>
    `
})

export class AssessmentTabsPageManagement {

    Summative: string = "AssessmentSummativePageManagement";
    Formative: string = "AssessmentFormativePageManagement";

  constructor() { }
  
}