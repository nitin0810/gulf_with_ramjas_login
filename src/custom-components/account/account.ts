import { Component } from '@angular/core';
import { IonicPage, Events, ModalController, ActionSheetController, ActionSheet } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { CustomService } from '../../services/custom.service';
import { AuthService } from '../../services/auth.service';



@IonicPage()
@Component({
    selector: 'account-page',
    templateUrl: 'account.html',
    styles: [``]
})
export class AccountPage {

    title = "Account";

    name: string;
    nickName: string;
    userImage: string;
    moreDetails = [];

    constructor(
        private events: Events,
        private modalCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController,
        private customService: CustomService,
        private authService: AuthService,
        private camera: Camera,

    ) {
        this.setDetails();
    }


    setDetails() {

        this.name = localStorage.getItem('name');
        localStorage.getItem('nickName') != "null" ? this.nickName = localStorage.getItem('nickName') : this.nickName = null;
        localStorage.getItem('picUrl') != "null" ? this.userImage = localStorage.getItem('picUrl') : this.userImage = "assets/images/user.png";

        this.moreDetails = [

            { name: 'Roll No', value: localStorage.getItem('id').substring(0,3), icon: 'finger-print' },
            { name: 'Username', value: localStorage.getItem('userName'), icon: 'person' },
            { name: 'Password', value: "******", icon: 'lock' },
            { name: 'Contact', value: localStorage.getItem('contactNo'), icon: 'call' },
            { name: 'Email-ID', value: localStorage.getItem('email'), icon: 'mail' },

        ];

        /**only in case of student */
        if (localStorage.getItem('isStudent') == "true") {

            this.moreDetails.push(
                { name: 'Program', value: localStorage.getItem('programName'), icon: 'folder' },
                { name: 'Year', value: localStorage.getItem('yearName'), icon: 'folder' },
            );
        } else {

            /**only in case of management */
            this.moreDetails.push(
                { name: 'Roles', value: JSON.parse(localStorage.getItem('roles')).toString(), icon: 'person' },
            );
        }
    }

    onPwdChange() {

        const modal = this.modalCtrl.create("EditPasswordPage");
        modal.present();
    }

    onImageClick() {

        let actionSheet: ActionSheet = this.actionSheetCtrl.create({

            title: 'Select Option',
            buttons: [
                {
                    text: 'Open Camera',
                    handler: () => { this.openCamera(); }
                }, {
                    text: 'Open Gallary',
                    handler: () => { this.openGallery(); }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => { }
                }
            ]
        });

        if (localStorage.getItem('picUrl') !== "null") {
            actionSheet.addButton(
                {
                    text: 'Delete Photo',
                    role: 'Destructive',
                    handler: () => { this.deletePhoto(); }
                }
            );
        }

        actionSheet.present();
    }

    deletePhoto() {

        this.customService.showLoader();
        this.authService.deletePic()
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Picture deleted successfully');
                this.userImage = "assets/images/user.png";
                localStorage.setItem('picUrl', "null");
                localStorage.setItem('picOriginalName', "null");
                this.events.publish("user:image");
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openGallery() {

        const options = this.authService.getCameraOptions(
            this.camera.DestinationType.FILE_URI,
            this.camera.PictureSourceType.PHOTOLIBRARY,
            this.camera.EncodingType.JPEG
        );

        this.camera.getPicture(options)
            .then((imageData) => {

                this.saveImage(imageData);
            }, (err) => { })
            .catch((err) => {
                // Handle error
                console.log('inside library catch ');
                this.customService.showToast('Error occured, Try again');
            });
    }


    openCamera() {

        const options = this.authService.getCameraOptions(
            this.camera.DestinationType.FILE_URI,
            this.camera.PictureSourceType.CAMERA,
            this.camera.EncodingType.JPEG
        );

        this.camera.getPicture(options)
            .then((imageData) => {

                this.saveImage(imageData);
            }, (err) => { })
            .catch((err) => {
                // Handle error
                console.log('inside library catch ');
                this.customService.showToast('Error occured, Try again');
            });
    }



    saveImage(image: any) {

        this.customService.showLoader();
        this.authService.uploadPic(image)
            .then((res: any) => {
                console.log('inside finally  submit then of account');

                // alert(JSON.stringify(res));
                let res1 = JSON.parse(res.response);
                this.userImage = res1.fileUrl;
                localStorage.setItem('picUrl', res1.fileUrl);
                localStorage.setItem('picOriginalName', res1.fileName);
                this.events.publish("user:image", res1.fileUrl);
                this.customService.hideLoader();
                this.customService.showToast('Picture Updated Successfully');

            }, (err) => {
                console.log('inside finally submit catch of account');
                // alert(JSON.stringify(err.body));

                try {
                    let error = JSON.parse(err.body);
                    let errMsg = (error.message || error.error) ? error.message || error.error : "Some Error Occured,Couldn't Create Circular";
                    this.customService.showToast(errMsg);
                } catch (e) {
                    this.customService.showToast(e.toString() || 'Some unexpected error occured');

                }
            });
    }


    onLogOut() {

        this.events.publish('user:logout');
    }
}
