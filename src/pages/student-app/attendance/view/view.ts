import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    templateUrl: './view.html'
})

export class AttendanceViewPageStudent {

    title: string = "Attendance";
    assessmentId: number;
    formOrSummType: string;
    attendance: any = {
        paper : 'English Literature',
        date : '6th April 2018',
        present : true,
        overall : {
            total : 25,
            attended : 7
        }
    };

    constructor(
        private navparam: NavParams,
        private viewCtrl: ViewController,
        private customService: CustomService
    ) {
        this.assessmentId = this.navparam.get('assessmentId');
        this.formOrSummType = this.navparam.get('formOrSummType');
    }

    ionViewWillEnter() {

        this.customService.showLoader();
        setTimeout(()=>{
            this.customService.hideLoader();
        },1000)
        // this.assessmentService.fetchAssessmentsById(this.formOrSummType, this.assessmentId)
        //     .subscribe((res: any) => {

        //         this.assessment = res;
        //         this.customService.hideLoader();
        //     }, (err: any) => {

        //         this.customService.hideLoader();
        //         this.customService.showToast(err.msg);
        //     });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}