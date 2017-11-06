

import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { ComplaintMainPage } from '../../../../custom-components/complaint-main/complaint-main';
import { ComplaintService } from '../../../../services/complaint.service';


@IonicPage()
@Component({
    selector: 'suggestion-by-me',
    templateUrl: './by-me.html',
    styles: [` `]
})

export class SuggestionByMeManagement {

    title: string = "Suggestions";
    complaintList: Array<any>;
    searchInput: string = '';
    debounceDuration: number = 400;
    @ViewChild(ComplaintMainPage) complaintMainPage: ComplaintMainPage;


    constructor(
        private complaintService: ComplaintService
    ) {
        this.complaintService.compOrSugg = "suggestion";
        console.log('by me constructor called/////');

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
