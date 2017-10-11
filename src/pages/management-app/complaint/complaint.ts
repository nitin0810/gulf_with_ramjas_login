

import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';
import { ComplaintMainPage } from '../../../custom-components/complaint-main/complaint-main';


@IonicPage()
@Component({
    selector: 'complaint',
    templateUrl: './complaint.html',
    styles: [` `]
})

export class ComplaintPageManagement {

    @ViewChild(ComplaintMainPage) complaintMainPage: ComplaintMainPage;

    title: string = "Complaints";
    complaintList: Array<any>;
    searchInput: string = '';
    debounceDuration: number = 400;

    constructor(
        private events: Events
    ) {


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
