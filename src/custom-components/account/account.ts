import { Component } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';
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
        private events: Events
    ) {
        this.setDetails();
    }


    setDetails() {

        this.name = localStorage.getItem('name');
        localStorage.getItem('nickName')!="null" ? this.nickName = localStorage.getItem('nickName') : this.nickName = null;
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
                { name: 'Roles', value: localStorage.getItem('roles'), icon: 'person' },
            );
        }


    }

    onPwdChange(){
        console.log('pwd change callled/////////');
        
    }

    // public openImageActionSheet(data) {
    //     let actionSheet = this.actionSheetCtrl.create({
    //         title: 'Choose Album',
    //         buttons: [{
    //             text: 'Delete Photo',
    //             role: 'destructive',
    //             handler: () => {
    //             }
    //         }, {
    //             text: 'Take Photo',
    //             handler: () => {
    //                 // this.openCamera();
    //             }
    //         }, {
    //             text: 'Choose Photo',
    //             handler: () => {
    //                 // this.openGallery();
    //             }
    //         }, {
    //             text: 'Cancel',
    //             role: 'cancel',
    //             handler: () => {
    //                 console.log('Cancel clicked');
    //             }
    //         }]
    //     });
    //     actionSheet.present();
    // }

    // public openGallery() {
    //   this.camera.getPicture({
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //     allowEdit: true,
    //     quality: 30
    //   }).then((imagedata) => {
    //     this.basePath = 'data:image/jpeg;base64,';
    //     this.userImage = imagedata;
    //     // this.saveImage(this.basePath + this.userImage);
    //   }, (err) => {
    //   });
    // }

    // public openCamera() {
    //   this.camera.getPicture({
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     targetWidth: 1000,
    //     targetHeight: 1000,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE,
    //     correctOrientation: true,
    //     allowEdit: true,
    //     quality: 30
    //   }).then((imagedata) => {
    //     this.basePath = 'data:image/jpeg;base64,';
    //     this.userImage = imagedata;
    //     this.saveImage(this.basePath + this.userImage);
    //   }, (err) => {
    //   });
    // }

    // public saveImage(image) {
    //   this.showLoader = true;
    //   this.auth.uploadPic(image).then((res) => {
    //     this.showLoader = false;
    //     this.events.publish("user:image", image);
    //     localStorage.setItem("picTimestamp", res.fileTimestamp);
    //     localStorage.setItem("picOriginalName", res.fileOriginalName);
    //   }, (err) => {
    //     this.showLoader = false;
    //     this.custom.errMessage();
    //   });
    // }

    // public openModal() {
    //     console.log("inside open modal");
    //     let viewComplaint = this.modalCtrl.create(resetPasswordModal);
    //     viewComplaint.present();
    // }

    onLogOut() {

        this.events.publish('user:logout');
    }
}
