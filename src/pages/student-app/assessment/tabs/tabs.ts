import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-tabs class="csGrayBackground" color="primary" tabsLayout='icon-start'>
    <ion-tab tabTitle="Summative" tabIcon="folder" [root]="Summative"></ion-tab>
    <ion-tab tabTitle="Formative" tabIcon="folder"  [root]="Formative"></ion-tab>
    </ion-tabs>
    `
})

export class AssessmentTabsPageStudent {

    Summative: string = "AssessmentSummativePageStudent";
    Formative: string = "AssessmentFormativePageStudent";

  constructor() { }
  
}