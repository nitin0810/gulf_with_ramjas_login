import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, Searchbar } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'faculty-search',
    templateUrl: './search.html',
    styles: [``]

})

/**this page is being used at many places where a particular name is to be selected from a List, being also used at:
 * in NewAppreciationPage for both student and management
 * hence required conditions have been applied in html
 */
export class FacultySearchPage {

    title: string;
    searchTempList: Array<any>;
    searchList: Array<any>;
    searchInput: string;
    noMatch: boolean = false;

    @ViewChild('searchbar') searchBar: Searchbar;
    constructor(
        private viewCtrl: ViewController,
        private navParam: NavParams
    ) {
        this.searchList = this.navParam.get('searchList');
        this.title = 'Select ' + this.navParam.get('title');
        this.searchTempList = this.searchList;

    }

    ionViewDidEnter() {
        console.log('ionview did enter called');
        console.log(this.searchBar);
        
        this.searchBar.setFocus();
    }

    onSearchInput(event: any) {

        if (event.type != 'input' || this.searchList.length == 0) { return; }

        if (this.searchInput.trim().length == 0) {
            this.searchTempList = this.searchList;
            this.noMatch = this.searchTempList.length == 0;
            return;
        }

        this.searchTempList = this.searchList.filter((search) => {

            return (search.name || search.facultyName).toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });

        this.noMatch = this.searchTempList.length == 0;

    }

    onSearchClear(event: any) {

        if (this.searchList.length == 0) { return; }
        this.searchTempList = this.searchList;
        this.noMatch = this.searchTempList.length == 0;
    }

    dismiss(selectedSearch?: any) {

        if (selectedSearch) {

            this.viewCtrl.dismiss({ 'selectedSearch': selectedSearch });
        } else { this.viewCtrl.dismiss(); }

    }
}