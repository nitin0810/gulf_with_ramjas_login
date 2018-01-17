import { NavParams, ViewController, IonicPage, NavController } from 'ionic-angular';
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
    defaultAvatar: string = "assets/images/user.png";

    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private navCtrl: NavController
    ) {

        this.timeTableInfo = this.navParams.get('timeTableInfo');

    }

    ionViewDidEnter() {

        /**check if the view page is stacked above new page, in this case
         * index of view is 1
         * and index of new is 0
         */
        if (this.viewCtrl.index == 1) {
            let newModal: ViewController = this.navCtrl.first(); // returns the NewTT modal page
            newModal.dismiss(this.timeTableInfo);
        }
    }

    dismiss() {

        this.viewCtrl.dismiss();
    }
}