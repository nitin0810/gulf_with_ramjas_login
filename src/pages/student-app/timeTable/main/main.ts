import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { TimeTableService } from '../../../../services/timeTable.service';
import { TimeTablePageManagement } from '../../../management-app/timeTable/main/main';

@IonicPage()
@Component({
    selector: 'time-table-stud',
    templateUrl: './main.html',
    styles: [` `]
})

export class TimeTablePageStudent extends TimeTablePageManagement {

    title: string = 'Time table';

    
    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public timeTableService: TimeTableService
    ) {
        super(modalCtrl, customService, timeTableService);
    }

    ionViewWillEnter() {

        this.todayDate = new Date();
        this.selectedDay = this.todayDate.toDateString().split(' ')[0];
        this.getTimeTable();
        this.loginType = localStorage.getItem('loginType');
    }
}
