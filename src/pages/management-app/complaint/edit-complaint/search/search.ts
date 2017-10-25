import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, Searchbar } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'faculty-search',
    templateUrl: './search.html',
    styles: [``]

})

/**this page is being used at may places where a particular name is to be selected from a , being also used at:
 * in NewAppreciationPage for both student and management
 * hence according conditions have been applied in html
 */
export class FacultySearchPage {

    title: string;;
    searchTempList: Array<any>;
    searchList: Array<any>;
    searchInput: string;

    @ViewChild(Searchbar) searchBar: Searchbar;
    constructor(
        private viewCtrl: ViewController,
        private navParam: NavParams
    ) {
        this.searchList = this.navParam.get('searchList');
        this.title = 'Select ' + this.navParam.get('title');
        this.searchTempList = this.searchList;

    }

    ionViewDidEnter() {
        this.searchBar.setFocus();
    }
    onSearchInput(event: any) {

        if (event.type != 'input') { return; }

        if (this.searchInput.trim().length == 0) { this.searchTempList = this.searchList; return; }

        this.searchTempList = this.searchList.filter((search) => {

            return search.name.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });

    }

    onSearchClear(event: any) {

        this.searchTempList = this.searchList;

    }

    dismiss(selectedSearch?: any) {

        if (selectedSearch) {

            this.viewCtrl.dismiss({ 'selectedSearch': selectedSearch });
        } else { this.viewCtrl.dismiss(); }

    }
}