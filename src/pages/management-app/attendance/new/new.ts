import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, ActionSheetController, NavParams } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    templateUrl: './new.html'

})

export class NewAttendancePageManagement {

    title: string = "New Attendance";

    timeTableInfo: any;
    selectedDate:string;

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams
    ) {
        this.timeTableInfo = this.navParams.get('timeTableInfo');
        this.selectedDate = this.todayDate();
    }

    todayDate() {

        return new Date().toISOString().substring(0, 10);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}