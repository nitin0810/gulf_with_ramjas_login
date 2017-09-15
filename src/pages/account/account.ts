import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'account-page',
    templateUrl: 'account.html',
    styles: [``]
})
export class AccountPage {

    name: string;
    emailId: string;
    contactNo: string;
    id: string;
    nickname: string;
    userImage: string = "assets/images/user.png";
    moreDetails = [];
    moreDetailsShown = false;

    title = "Account";
    public showLoader: boolean = false;
    public imagePath: string = localStorage.getItem('fileUrl') + "/";
    public basePath = localStorage.getItem('fileUrl') + "/";
    // public userImage: string = localStorage.getItem("picTimestamp");

    constructor(

    ) {

    }


    ionViewWillEnter() {
        console.log("inside ionviewwillenter");
        // main details
        this.name = localStorage.getItem("name");
        this.emailId = localStorage.getItem("email");
        this.contactNo = localStorage.getItem("contactNo");
        this.id = localStorage.getItem("id");

        //extra details

        this.moreDetails = [
            { name: 'Designation', value: localStorage.getItem('designation'), icon: 'person' },
            { name: 'Organisation', value: localStorage.getItem('organisation'), icon: 'home' },
            { name: 'Area of Interest', value: localStorage.getItem('areaOfInterest'), icon: 'construct' },
            { name: 'Address1', value: localStorage.getItem('address1'), icon: 'home' },
            { name: 'Address2', value: localStorage.getItem('address2'), icon: 'home' },
            { name: 'City', value: localStorage.getItem('city'), icon: '' },
            { name: 'State', value: localStorage.getItem('state'), icon: '' },

        ]

    };





    logout() {
        // this.events.publish('user:logout');
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
}
