import { NavParams, ViewController,IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
    selector: 'time-table-view',
    templateUrl: './view-timetable.html',
    styles: [` `]
})

export class TimeTableViewPage {

    title: string = 'View Timetable';

    timeTableInfo: any; // details of timetable to be edited
    defaultAvatar:string = "assets/images/user.png";

    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController
    ) {
        
        this.timeTableInfo = this.navParams.get('timeTableInfo');
        
    }

    dismiss() {

        this.viewCtrl.dismiss();
    }
}