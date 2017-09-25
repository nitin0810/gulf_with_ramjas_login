import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavParams } from 'ionic-angular';

import { CustomService } from '../../../services/custom.service';
import { ComplaintService } from '../../../services/complaint.service';

@IonicPage()
@Component({
    selector: 'view-compaint',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewComplaintPage {

    title = "VIEW COMPLAINT";
    complaint: any;
    compalintStatusChanged: boolean = false; // to detect successfull reopen or close 

    constructor(
        private params: NavParams,
        private complaintService: ComplaintService,
        private viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private customService: CustomService
    ) {
        this.complaint = this.params.get('viewCompl');
    }

    closeComplaint() {

        let alert = this.alertCtrl.create({
            title: 'Do you really want to close ? ',
            inputs: [
                {
                    name: 'description',
                    placeholder: 'Write short description'
                },

            ],
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: data => {
                        console.log(data);
                        if (data.description.trim().length == 0) {
                            this.customService.showToast('Description is required ');
                            return;
                        }
                        this.closeFinally(data.description);

                    }
                }
            ]
        });
        alert.present();
    }

    closeFinally(description: string) {

        this.customService.showLoader();
        this.complaintService.closeComplaint(this.complaint.id, description)
            .subscribe((res: any) => {

                this.complaint = res;
                this.compalintStatusChanged = true;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    reOpenComplaint() {

        let alert = this.alertCtrl.create({
            title: 'If you are not happy with the resolution, you can reopen ',
            inputs: [
                {
                    name: 'description',
                    placeholder: 'Write short description'
                },

            ],
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: data => {
                        console.log(data);
                        if (data.description.trim().length == 0) {
                            this.customService.showToast('Description is required ');
                            return;
                        }
                        this.reOpenFinally(data.description);

                    }
                }
            ]
        });
        alert.present();
    }

    reOpenFinally(description: string) {

        this.customService.showLoader();
        this.complaintService.reOpenComplaint(this.complaint.id, description)
            .subscribe((res: any) => {

                this.complaint = res;
                this.compalintStatusChanged = true;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    dismiss() {
        if (this.compalintStatusChanged) {
            this.viewCtrl.dismiss({ 'newData': this.complaint });
        }
        else {
            this.viewCtrl.dismiss();
        }


    }
}