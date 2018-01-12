import { Injectable } from '@angular/core';
import {
    ToastController,
    LoadingController,
} from 'ionic-angular';

@Injectable()

export class CustomService {

    loading: any;
    toast: any;

    constructor(
        private l: LoadingController,
        private toastCtrl: ToastController
    ) { }

    public showLoader(text?: string) {

        this.loading = this.l.create({
            content: text || 'Please wait...'
        });
        this.loading.present();


    }

    public hideLoader() {

        return this.loading.dismiss();

    }

    public showToast(msg, pos?: string, closeBtn?: boolean) {

        this.toast = this.toastCtrl.create({
            message: msg,
            duration: closeBtn ? null : 3000,
            position: pos || 'bottom',
            showCloseButton: closeBtn,
            closeButtonText: "OK"
            // cssClass: 'redBg'
        });

        this.toast.present();
    }

    public errMessage() {

        let toast = this.toastCtrl.create({
            message: 'Internal server error.. Try again later',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

}