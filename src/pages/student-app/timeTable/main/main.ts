import { Component } from '@angular/core';
import { IonicPage, ModalController,ActionSheetController } from 'ionic-angular';
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
        public actionSheetCtrl: ActionSheetController,
        public timeTableService: TimeTableService
    ) {
        super(modalCtrl, customService, actionSheetCtrl,timeTableService);
    }

    ionViewWillEnter() {

        this.date = new Date();
        this.selectedDay = this.date.toDateString().split(' ')[0];
        this.getDaysAndTimeTable();
        // this.loginType = localStorage.getItem('loginType');
    }


}
