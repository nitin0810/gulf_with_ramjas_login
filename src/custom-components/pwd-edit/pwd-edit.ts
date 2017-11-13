import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@IonicPage()
@Component({
    selector: 'edit-pwd',
    templateUrl: './pwd-edit.html',
    styles: [``]
})

export class EditPasswordPage {

    title = "Change Password";
    oldPwd: string;
    newPwd: string;
    newPwdConfirm: string;

    constructor(
        private viewCtrl: ViewController
    ) {

    }

    onChangePwd() {
        console.log('cahnge pwd clicked//////');

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}