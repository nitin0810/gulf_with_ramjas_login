import { Component, Input } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'faculty-search',
    templateUrl: './search.html',
    styles: [``]

})

export class FacultySearchPage {

    title: string = "Select Faculty";
    facultyTempList: Array<any>;
    facultyList: Array<any>;
    searchInput: string;

    constructor(
        private viewCtrl: ViewController
    ) {

        this.facultyList = [];
        for (let i = 1; i <= 50; i++) {
            let n = Math.floor(Math.random() * 10);
            console.log(n);
            let name: String = '';
            switch (n) {
                case 0: name = "n";
                    break;
                case 1: name = "ni"; break;
                case 2: name = "nit"; break;
                case 3: name = "niti"; break;
                case 4: name = "nitin"; break;
                case 5: name = "NIter"; break;
                case 6: name = "abah"; break;
                case 7: name = "byr"; break;
                // case 8: name = "78"; break;
                case 9: name = "nitin445";
            }
            console.log(name);

            this.facultyList.push({ id: i, name: name });
        }
        this.facultyTempList = this.facultyList;

    }

    onSearchInput(event: any) {
        console.log("searchInput called", event.type);

        if (event.type != 'input') { return; }

        if (this.searchInput.length == 0) { this.facultyTempList = this.facultyList; return; }

        this.facultyTempList = this.facultyList.filter((faculty) => {

            return faculty.name.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1;
        });

    }

    onSearchClear(event: any) {
        console.log("searchclear called");

        this.facultyTempList = this.facultyList;

    }
    setSelectedFaculty(faculty: any) {
        console.log(faculty);

    }
    dismiss(selectedFaculty?: any) {

        this.viewCtrl.dismiss();
    }
}