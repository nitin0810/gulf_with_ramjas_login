import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, ModalController, ActionSheetController, NavParams, AlertController, Searchbar } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AttendanceService } from '../../../../services/attendance.service';

@IonicPage()
@Component({
    templateUrl: './search.html',
    styles:[`
    ion-radio{
        top: 6px;
    border: 1px solid black;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    }
    `]

})

export class SearchAttendancePageManagement {

    title: string = "Mark Attendance";
    searchTempList: Array<any>;
    searchList: Array<any>;
    searchInput: string;
    noMatch: boolean = false;

    @ViewChild('searchbar') searchBar: Searchbar;
    constructor(
        private viewCtrl: ViewController,
        private navParam: NavParams
    ) {
        /**for now it is by reference
         * it is to be changed by value
         */
        this.searchList = [...this.navParam.get('searchList')];
        this.searchTempList = this.searchList;

    }

    ionViewDidEnter() {
        console.log('ionview did enter called');
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

    dismiss() {

        this.viewCtrl.dismiss();

    }

    onSaveAndBack() {
        console.log('on save and go back',this.searchList);
        
        this.viewCtrl.dismiss(this.searchList);
    }
}