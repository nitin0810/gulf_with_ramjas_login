import { Component } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-tabs  color="primary" tabsLayout='icon-start'>
    <ion-tab tabTitle="FOR ME" tabIcon="person" [root]="AppreciationForMe"></ion-tab>
    <ion-tab tabTitle="BY ME" tabIcon="person-add"  [root]="AppreciationByMe"></ion-tab>
    </ion-tabs>
    `
})

export class AppreciationTabsPageStudent {

  AppreciationByMe: string = "AppreciationByMePageStudent";
  AppreciationForMe: string = "AppreciationForMePageStudent";

  constructor() { }
  
}