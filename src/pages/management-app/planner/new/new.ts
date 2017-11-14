import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { NewPollPageManagement } from '../../poll/newPoll/newPoll';
import { PollService } from '../../../../services/poll.service';
import { PlannerService } from '../../../../services/planner.service';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';




@IonicPage()
@Component({
    selector: 'new-planner',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewPlannerPageManagement extends NewPollPageManagement {

    title: string = "New Event";

    /**ngModel variables */
    eventTitle: string;
    description: string;
    startDateTime: any;
    endDateTime: any;
    minDate: any = new Date().toISOString().substring(0, 10);
    isEndGreaterThanStart: boolean = false;

    file: any;
    image: any;
    showSpinner: boolean = false;

    constructor(
        public viewCtrl: ViewController,
        public pollService: PollService,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController,
        private plannerService: PlannerService,
        private camera: Camera,
        private fileChooser: FileChooser

    ) {
        super(viewCtrl, pollService, customService, actionSheetCtrl);
        this.startDateTime = this.endDateTime = this.getCorrectISOStringDate();

    }

    ionViewWillEnter() {

        this.getMainAudeinceData();
    }

    getCorrectISOStringDate() {

        /**new Date().toISOString returns incorrrect time( by ignoring the time zone)
         * hence, this method has been made to get the correct isoString time
        */
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5) + "Z";
    }

    onEndDateChange() {

        if (new Date(this.endDateTime).getTime() < new Date(this.startDateTime).getTime()) {
            this.isEndGreaterThanStart = false;
            this.customService.showToast("End Date should be later than Start Date");
            return ;
        }
        this.isEndGreaterThanStart = true;



    }

    onFileUpload() {
        const actionSheet = this.actionSheetCtrl.create({

            title: 'Select File Using',
            buttons: [
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.fromCamera();
                    }

                },
                {
                    text: 'Photo Library',
                    handler: () => {
                        this.fromLibrary();
                    }

                },
                {
                    text: 'File System (PDF only)',
                    handler: () => {
                        this.selectFile();
                    }

                },
                {
                    text: 'Cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }

    onFileUnselect() {

        this.image = this.file = null;
    }

    fromCamera() {

        const options: CameraOptions = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            allowEdit: true,
            correctOrientation: true
        }
        this.showSpinner = true;
        this.camera.getPicture(options).then((imageData) => {

            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            // console.log('inside camera clbl');
            this.image = 'data:image/jpeg;base64,' + imageData;
            this.file = null;
            this.showSpinner = false;
        }, (err: any) => {

            // Handle error
            // console.log('inisde camera 2nd clbk');
            this.showSpinner = false;

        })
            .catch((err: any) => {
                // console.log('inside camera catch');
                console.log(err);
                this.showSpinner = false;

            });
    }

    fromLibrary() {
        // console.log('from library.....');
        const options: CameraOptions = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE, // only used in case of photo library
            allowEdit: true,
            correctOrientation: true
        }

        this.showSpinner = true;
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            // console.log('inside library clbk');
            this.showSpinner = false;
            this.image = 'data:image/jpeg;base64,' + imageData;
            this.file = null;
        }, (err) => {
            // console.log('inside library 2nd clbk');
            this.showSpinner = false;

        })
            .catch((err) => {
                // Handle error
                // console.log('inside library catch ');
                this.customService.showToast('Error in uploading image');
                this.showSpinner = false;

            });
    }


    selectFile() {
        this.fileChooser.open()
            .then(uri => {
                console.log(uri);
                this.file = uri;
                this.image = null;
            })
            .catch(e => {
                console.log(e)
            });
    }


    onSubmit() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to create the Event ?',
            buttons: [
                {
                    text: 'Create',
                    handler: () => {
                        this.finallySubmit();
                    }

                },
                {
                    text: 'Cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();

    }

    finallySubmit() {

        let payLoad: any = this.buildPayload();

        if (!this.file && !this.image) {

            this.submitEventWithoutFile(payLoad);
        } else {

            this.submitEventWithFile(payLoad);
        }


    }
    /**sets the payload except the file/image */
    buildPayload() {

        let data: any = {
            title: this.eventTitle,
            description: this.description,
            start: this.startDateTime.slice(0,-1),
            end: this.endDateTime.slice(0,-1),
            mainAudienceId: this.mainAudience.id
        }
        console.log(data);

        switch (this.mainAudience.id) {

            case 1: data.audienceIds = this.audienceIds;
                break;

            case 2: data.audienceIds = this.audienceIds;
                data.departmentIds = this.departmentIds;
                break;

            case 3: data.programIds = this.programIds;
                data.yearIds = this.yearIds;
                break;

            case 4:
                data.yearIds = [this.yearForModule.id || this.yearForModule.yearId];
                data.moduleIds = this.moduleIds;
        }

        return data;

    }

    submitEventWithoutFile(data: any) {

        let formData = new FormData();

        for (let key in data) {
            formData.append(key, data[key]);
        }
        this.customService.showLoader();
        this.plannerService.submitWithoutFile(formData)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Event created successfully');
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    submitEventWithFile(data: any) {

        data.file = this.file;
        data.image = this.image;

        this.customService.showLoader();

        this.plannerService.submitWithFile(data)
            .then((res: any) => {

                // console.log('inside finally submit then');
                alert(JSON.stringify(res));

                this.customService.hideLoader();
                this.customService.showToast('Assignment submitted successfully');
                this.dismiss(res);
            }, (err: any) => {

                alert(JSON.stringify(err.body));
                // console.log('inside finally submit catch');
                this.customService.hideLoader();
                let errMsg = JSON.parse(err.body).message || 'Some Error Occured';
                this.customService.showToast(errMsg);
            });
    }

    dismiss(res?:any) {

        this.viewCtrl.dismiss(res);
    }

}