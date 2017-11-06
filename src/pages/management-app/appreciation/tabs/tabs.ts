import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-tabs class="csGrayBackground" color="primary" tabsLayout='icon-start'>
    <ion-tab tabTitle="FOR ME" tabIcon="person" [root]="AppreciationForMe"></ion-tab>
    <ion-tab tabTitle="BY ME" tabIcon="person-add"  [root]="AppreciationByMe"></ion-tab>
    </ion-tabs>
    `
})

export class AppreciationTabsPageManagement {

  AppreciationByMe: string = "AppreciationByMePageManagement";
  AppreciationForMe: string = "AppreciationForMePageManagement";

  constructor() { }
  
}