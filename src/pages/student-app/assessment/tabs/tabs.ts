import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-tabs  color="primary" tabsLayout='icon-start'>
    <ion-tab tabTitle=" " tabIcon="" [root]="Summative"></ion-tab>
    <ion-tab tabTitle=" " tabIcon=""  [root]="Formative"></ion-tab>
    </ion-tabs>
    `
})

export class AssessmentTabsPageStudent {

    Summative: string = "AssessmentSummativePageStudent";
    Formative: string = "AssessmentFormativePageStudent";

  constructor() { }
  
}