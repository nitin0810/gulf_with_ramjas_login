

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { ComplaintMainPage } from '../../../custom-components/complaint-main/complaint-main';
import { ComplaintService } from '../../../services/complaint.service';


@IonicPage()
@Component({
    selector: 'complaint',
    templateUrl: './complaint.html',
    styles: [` `]
})

export class ComplaintPageManagement {

    @ViewChild(ComplaintMainPage) complaintMainPage: ComplaintMainPage;

    //variables for scroll
    start = 0;
    threshold = 100;
    slideHeaderPrevious = 0;
    ionScroll:any;
    showHelpers:boolean;
    hideHelpers:boolean;
    headercontent:any;

    title: string = "Complaints";
    complaintList: Array<any>;
    searchInput: string = '';
    debounceDuration: number = 400;

    constructor(
        private complaintService: ComplaintService,
        public myElement: ElementRef,
    ) {
        this.complaintService.compOrSugg = "complaint";

        this.showHelpers =false;
        this.hideHelpers = true;

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
