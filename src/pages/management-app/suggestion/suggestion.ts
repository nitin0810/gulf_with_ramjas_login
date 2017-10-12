import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-tabs class="csGrayBackground" color="primary" tabsLayout='icon-start'>
    <ion-tab tabTitle="FOR ME" tabIcon="person" [root]="SuggestionForMe"></ion-tab>
    <ion-tab tabTitle="BY ME" tabIcon="person-add"  [root]="SuggestionByMe">BY ME</ion-tab>
    </ion-tabs>` 
})

export class SuggestionTabsManagement {
  SuggestionByMe:string = "SuggestionByMeManagement";
  SuggestionForMe:string = "SuggestionForMeManagement";

}