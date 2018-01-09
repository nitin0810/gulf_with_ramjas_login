
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Events, AlertController } from 'ionic-angular';
import { CustomService } from './custom.service';
import { AttendanceService } from './attendance.service';

@Injectable()
export class NetworkService {

    savedAttendances: Array<any>;

    constructor(
        private events: Events,
        private network: Network,
        private customService: CustomService,
        private alertCtrl: AlertController,
        private attendanceService: AttendanceService
    ) { }

    checkNetworkStatus() {

        this.network.onConnect().subscribe(() => {
            console.log('ONCONNECT SUBSCRIBE.......');

            // this.events.publish("online");
            this.checkAndUploadSavedAttendance();

        });
        this.network.onDisconnect().subscribe(() => {
            console.log('ONDISCONNECT SUBSCRIBE.......');

            // this.events.publish("offline");
            this.customService.showToast('You are not connected to Internet', 'top', true);
        });
    }

    checkAndUploadSavedAttendance() {

        if (localStorage.getItem('savedAttendances')) {
            this.savedAttendances = JSON.parse(localStorage.getItem('savedAttendances'));
            this.uploadAttendance(this.savedAttendances[0], 0);
        }
    }

    uploadAttendance(data: any, index: number) {

        console.log("SAVED ATTENDANCES: ", this.savedAttendances);



        if (data && data.isUploaded) {
            this.uploadAttendance(this.savedAttendances[index + 1], index + 1);
            return;
        }
        console.log('UPLOADING ATTENDANCE///////');

        this.attendanceService.postAttendance(data.uploadData)
            .subscribe((res: any) => {

                data.isUploaded = true;
                data.comment = "uploaded successfully";
                index < this.savedAttendances.length - 1 ? this.uploadAttendance(this.savedAttendances[index + 1], index + 1) : this.showMessage();
            }, (err: any) => {

                data.comment = err.msg;
                index < this.savedAttendances.length - 1 ? this.uploadAttendance(this.savedAttendances[index + 1], index + 1) : this.showMessage();
            });
    }

    showMessage() {
        let x: number = 0;
        this.savedAttendances.forEach(att => att.isUploaded && x++);

        let msg = `${x} saved  attendances uploaded successfully`;
        if (this.savedAttendances.length - x > 0) {
            msg = msg + '\n' + `${this.savedAttendances.length - x} attendances couldn't be uploaded
                                Will be tried later`;
        }


        localStorage.setItem('savedAttendances', JSON.stringify(this.savedAttendances));

        const alert = this.alertCtrl.create({
            title: 'Saved Attendances',
            message: msg,
            buttons: [{
                text: 'OK',
                handler: () => { }
            }]
        });

        alert.present();
    }

}

