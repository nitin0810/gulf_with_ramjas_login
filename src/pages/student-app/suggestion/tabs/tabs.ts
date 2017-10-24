import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-tabs class="csGrayBackground" color="primary" tabsLayout='icon-start'>
      <ion-tab tabTitle="BY ME" tabIcon="person-add"  [root]="SuggestionByMe">BY ME</ion-tab>
      <ion-tab tabTitle="FOR ME" tabIcon="person" [root]="SuggestionForMe"></ion-tab>
    </ion-tabs>` 
})

export class SuggestionTabsPageStudent {
  SuggestionByMe:string = "SuggestionByMeStudent";
  SuggestionForMe:string = "SuggestionForMeStudent";

}