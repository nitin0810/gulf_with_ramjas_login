import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Events, ModalController, MenuController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { CustomService } from '../../services/custom.service';

import { ForgotPasswordModal } from './forgot-password/forgot-password';

@Component({
    selector: 'login-page',
    templateUrl: 'login.html',
    // styleUrls :['login.scss']

})

export class LoginPage implements OnInit {

    loginType:string = "student";

    loginForm: FormGroup;
    icon: String = "eye";
    pswdInputType: string;

    constructor(
        public formBuilder: FormBuilder,
        private menu: MenuController,
        private modalCtrl: ModalController,
        private events: Events,
        private custom: CustomService,
        public authService: AuthService,
    ) { }

    ngOnInit() {

        this.menu.swipeEnable(false);
        this.loginForm = this.formBuilder.group({
            username: ['ajay', Validators.required],
            password: ['abc123', Validators.required]
        });
    }

    login() {

        console.log(this.loginType);
        
        this.custom.showLoader("Authenticating...");
        this.authService.verifyCredentials(this.loginForm.value)
            .subscribe((res: any) => {

                this.authService.saveToken(res.access_token);
                localStorage.setItem('loginType',this.loginType);
                let isStudent = (this.loginType==="student").toString();
                localStorage.setItem('isStudent',isStudent);// just for checking the loginType conveniently
                this.getUserInfo();
            }, (err) => {

                this.loginFailed(err);
            });
    }


    public getUserInfo() {

        this.authService.getUserInfo()
            .subscribe((res: any) => {

                this.loggedInSuccesfully(res);
            }, (err) => {

                this.custom.hideLoader();
                this.custom.errMessage();
                this.loginForm.reset();
            });
    }

    public loggedInSuccesfully(res) {
        this.custom.hideLoader();
        this.authService.storeUserData(res);
        this.events.publish('user:login');
        // this.setNotificationToken();
    }


    public loginFailed(err) {

        this.custom.hideLoader();
        if (err.status == 400) {

            this.custom.showToast("Invalid credentials, Enter correct Information.");
        } else {

            this.custom.showToast(err.msg);
        }
    }


    public openFrgtPswdModal() {
        console.log("frgt pswd");
        let a = this.modalCtrl.create(ForgotPasswordModal);
        a.present();
    }

    public showPassword(input: any): any {

        this.pswdInputType = input.type === 'password' ? 'text' : 'password';
        this.icon = input.type === 'password' ? 'eye' : 'eye-off';
    }

}