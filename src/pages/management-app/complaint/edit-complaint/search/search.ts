import { Component, Input } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'faculty-search',
    templateUrl: './search.html',
    styles: [``]

})

export class FacultySearchPage {

    title: string;;
    searchTempList: Array<any>;
    searchList: Array<any>;
    searchInput: string;

    constructor(
        private viewCtrl: ViewController,
        private navParam: NavParams
    ) {
        this.searchList = this.navParam.get('searchList');
        this.title = 'Search ' + this.navParam.get('title');
        this.searchTempList = this.searchList;

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