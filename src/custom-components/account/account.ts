import { Component } from '@angular/core';
import { IonicPage, Events, ModalController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CustomService } from '../../services/custom.service';
import { AuthService } from '../../services/auth.service';
import { locale } from 'moment';



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

            { name: 'ID', value: localStorage.getItem('id'), icon: 'finger-print' },
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

        let actionSheet = this.actionSheetCtrl.create({

            title: 'Select Option',
            buttons: [
                {
                    text: 'Delete Photo',
                    role: 'destructive',
                    handler: () => { this.deletePhoto(); }
                },
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
                }]
        });
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

        const options: CameraOptions = {
            quality: 30,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE, // only used in case of photo library
            allowEdit: true,
            correctOrientation: true
        }


        this.camera.getPicture(options)
            .then((imageData) => {

                this.saveImage(imageData);

            }, (err) => { })
            .catch((err) => {
                // Handle error
                console.log('inside library catch ');
                this.customService.showToast('Error in uploading image');

            });
    }


    openCamera() {

        const options: CameraOptions = {
            quality: 30,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            allowEdit: true,
            correctOrientation: true
        }

        this.camera.getPicture(options)
            .then((imageData) => {

                this.saveImage(imageData);
            }, (err) => { })
            .catch((err) => {
                // Handle error
                console.log('inside library catch ');
                this.customService.showToast('Error in uploading image');

            });;
    }



    saveImage(image: any) {

        this.customService.showLoader();
        this.authService.uploadPic(image)
            .then((res: any) => {

                // alert(JSON.stringify(res));
                this.userImage = res.fileUrl;
                localStorage.setItem('picUrl', res.fileUrl);
                localStorage.setItem('picOriginalName', res.fileName);
                this.events.publish("user:image", res.fileUrl);
                this.customService.hideLoader();
                this.customService.showToast('Picture Updated Successfully');

            }, (err) => {

                this.customService.hideLoader();
                let errMsg = JSON.parse(err.body).error_description || JSON.parse(err.body).error || 'Some Error Occured';
                this.customService.showToast(errMsg);
            });
    }


    onLogOut() {

        this.events.publish('user:logout');
    }
}
