import { Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ComplaintMainPage } from '../../../../custom-components/complaint-main/complaint-main';
import { ComplaintService } from '../../../../services/complaint.service';

@IonicPage()
@Component({
  templateUrl: './for-me.html',
  styles: [`
  ion-searchbar{
    top: 45px;
  }
  .scroll-content{
    padding-top: 84px !important;
  }
  div[subHeader]{
    position: fixed;
    z-index: 2;
    transition: top 0.5s ease;
    width: 100%;
    top: 72px;
  }
  .hide-filter{
    top: -20px !important;
    }
    .show-filter{
      top: 72px;
    }
    ion-item[blank]{
      height: 84px;
    }
  `]

})

export class SuggestionForMeManagement implements OnDestroy {

  //variables for scroll
  start = 0;
  threshold = 100;
  slideHeaderPrevious = 0;
  ionScroll:any;
  showHelpers:boolean;
  hideHelpers:boolean;
  headercontent:any;

  title: string = "Suggestions";
  complaintList: Array<any>;
  searchInput: string = '';
  debounceDuration: number = 400;
  @ViewChild(ComplaintMainPage) complaintMainPage: ComplaintMainPage;

  constructor(
    private complaintService: ComplaintService,
    public myElement: ElementRef,

  ) {
    console.log('for me constructor called/////');
    this.complaintService.compOrSugg = "suggestion";

  }

  ngOnInit() {
    // Ionic scroll element
    this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
    // On scroll function
    this.ionScroll.addEventListener('scroll', () => {
        if (this.ionScroll.scrollTop - this.start > this.threshold) {
            this.showHelpers = true;
            this.hideHelpers = false;
        } else {
            this.showHelpers = false;
            this.hideHelpers = true;
        }
        if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
            this.showHelpers = false;
            this.hideHelpers = true;
        }
        this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
    });
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