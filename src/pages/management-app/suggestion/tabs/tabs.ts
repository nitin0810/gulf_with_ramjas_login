import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <ion-tabs #myTabs2 class="csGrayBackground" color="primary" tabsLayout='icon-start'>
    <ion-tab tabTitle="FOR ME" tabIcon="person" [root]="SuggestionForMe"></ion-tab>
    <ion-tab tabTitle="BY ME" tabIcon="person-add"  [root]="SuggestionByMe"></ion-tab>
    </ion-tabs>
    `
})

export class SuggestionTabsPageManagement {
  @ViewChild('myTabs2') tabRef: Tabs;
  SuggestionByMe: string = "SuggestionByMeManagement";
  SuggestionForMe: string = "SuggestionForMeManagement";

  constructor() { }
  ionViewDidEnter() {
    console.log('suggsestion tab did enter called/////');

    // this.tabRef.select(0);
    console.log(this.tabRef.getByIndex(0));
  }
}