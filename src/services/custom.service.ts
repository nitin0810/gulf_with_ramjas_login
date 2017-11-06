import { Injectable } from '@angular/core';
import {
    ToastController,
    LoadingController,
} from 'ionic-angular';

@Injectable()

export class CustomService {

    public txt: String;
    public loading: any;
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

        this.loading.dismiss();

    }

    public showToast(msg) {

        this.toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        console.log('toast', this.loading);

        this.toast.present();
    }

    public hideToast() {

        // if (this.toast) {
        //     this.toast.dismiss().
        //     catch (()=> { });
        // }
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