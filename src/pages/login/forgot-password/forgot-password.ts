import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

// import service
import { AuthService } from '../../../services/auth.service';
import { CustomService } from '../../../services/custom.service';

@Component({
    selector: 'forgot-password-modal',
    templateUrl: 'forgot-password.html'
})

export class ForgotPasswordModal {

    username: any;

    title: string = "Forgot Password";

    constructor(
        private viewCtrl: ViewController,
        public nl: CustomService,
        public appService: AuthService
    ) { }

    public dismiss() {
        console.log("asdfas");
        
        this.viewCtrl.dismiss();
    }

    public forgotPassword() {
        console.log("otp sent");
        
        // this.nl.showLoader();
        // this.appService.forgotPassword(this.data.username).subscribe((res) => {
        //   console.log(res);
        //   this.onSuccess();
        // }, (err) => {
        //   console.log(err)
        //   this.nl.hideLoader();
        // });
    }

    onSuccess() {
        this.nl.hideLoader();
        this.dismiss();
        this.nl.showToast("Password sent to your register mobile number");
    }

}
