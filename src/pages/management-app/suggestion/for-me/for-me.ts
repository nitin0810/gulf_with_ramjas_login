import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ComplaintMainPage } from '../../../../custom-components/complaint-main/complaint-main';
import { ComplaintService } from '../../../../services/complaint.service';

@IonicPage()
@Component({
  templateUrl: './for-me.html'

})

export class SuggestionForMeManagement implements OnDestroy {

  title: string = "Suggestions";
  complaintList: Array<any>;
  searchInput: string = '';
  debounceDuration: number = 400;
  @ViewChild(ComplaintMainPage) complaintMainPage: ComplaintMainPage;

  constructor(
    private complaintService: ComplaintService

  ) {
    console.log('for me constructor called/////');
    this.complaintService.compOrSugg = "suggestion";

  }

  ngOnDestroy() {
    console.log("for me destroyed.//////////");
  }


  onSortFilterSelect(event: any) {

    this.complaintMainPage.onSortFilterSelect(event);
    this.searchInput = '';

  }


  openNewComplaintModal() {
    this.complaintMainPage.openNewComplaintModal();
  }



  doRefresh(refresher: any) {
    this.complaintMainPage.doRefresh(refresher);
    this.searchInput = '';
  }



  onSearchInput(event: any) {

    this.complaintMainPage.onSearchInput(event);

  }



  onSearchClear(event: any) {

    this.complaintMainPage.onSearchClear(event);
  }
}