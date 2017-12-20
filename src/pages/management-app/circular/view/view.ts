
import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavController, NavParams, DateTime } from 'ionic-angular';
import { CircularService } from '../../../../services/circular.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'view-circular',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewCircularPageManagement {

    @ViewChild('dateTime') dateTime: DateTime;
    title: string = "View Circular";
    circularId: number; // recieved from navparams
    isExpired :boolean; // recieved from navparams
    circular: any; // complete circular info to be fetched from server
    newExpiryDate: any = new Date().toISOString().substring(0, 10);
    showInfo: boolean = true;
    fileCount: number = 0;
    constructor(
        private navparam: NavParams,
        private viewCtrl: ViewController,
        private circularService: CircularService,
        private customService: CustomService
    ) {
        this.circularId = this.navparam.get('circularId');
        this.isExpired =this.navparam.get('isExpired');
        this.getCircularInfo();
    }

    getCircularInfo() {

        this.customService.showLoader();
        this.circularService.fetchCircularById(this.circularId)
            .subscribe((res: any) => {

                this.circular = res;
                this.newExpiryDate = this.circular.expiredAt;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    todayDate() {
        return new Date().toISOString().substring(0, 10);
    }

    // editExpiryDate() {

    //     this.dateTime.open();
    // }

    // updateExpiryDate() {

    //     this.customService.showLoader();
    //     this.circularService.editExpiryDate({ expiredAt: this.newExpiryDate }, this.circular.id)
    //         .subscribe((res: any) => {
    //             this.customService.hideLoader();
    //             this.customService.showToast("Expiry date edited successfully");
    //             this.circular.expiredAt = res.expiredAt; // same as this.newExpiryDate;
    //         }, (err: any) => {
    //             this.customService.hideLoader();
    //             this.customService.showToast(err.msg);
    //         });
    // }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}