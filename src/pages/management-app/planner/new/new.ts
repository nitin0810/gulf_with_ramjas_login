import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { NewPollPageManagement } from '../../poll/newPoll/newPoll';
import { PollService } from '../../../../services/poll.service';
import { PlannerService } from '../../../../services/planner.service';
import { FileSelectService } from '../../../../services/fileSelect.service';

import { Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
// import { FileChooser } from '@ionic-native/file-chooser';
// import { FilePath } from '@ionic-native/file-path';




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
    location: string;
    startDateTime: any;
    endDateTime: any;
    minDate: any;
    isEndGreaterThanStart: boolean = false;

    file: any;
    fileName: string;
    image: any;
    showSpinner: boolean = false;

    constructor(
        public viewCtrl: ViewController,
        public pollService: PollService,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController,
        private plannerService: PlannerService,
        private fileSelectService: FileSelectService,
        private camera: Camera,
        private platform: Platform

    ) {
        super(viewCtrl, pollService, customService, actionSheetCtrl);
        this.startDateTime = this.endDateTime = this.minDate = this.getCorrectISOStringDate();

    }

    ionViewWillEnter() {

        this.getMainAudeinceData();
    }

    getCorrectISOStringDate() {

        /**new Date().toISOString returns incorrrect time( by ignoring the time zone)
         * hence, this method has been made to get the correct isoString time
        */
        let today: any = new Date();
        today.setHours(today.getHours() + 1);
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        return (new Date(today - tzoffset)).toISOString().slice(0, -5) + "Z";
    }


    onEndDateChange() {

        if (new Date(this.endDateTime) < new Date(this.startDateTime)) {
            this.isEndGreaterThanStart = false;
            this.customService.showToast("End Date should be later than Start Date");
            return;
        }
        this.isEndGreaterThanStart = true;
    }

    onFileUpload() {
        const actionSheet = this.actionSheetCtrl.create({

            title: 'Select File Using',
            buttons: [
                {
                    text: 'Camera',
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
                    text: 'Cancel',
                    role:'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        if (this.platform.is('android')) {
            actionSheet.addButton(
                {
                    text: 'File System(pdf only)',
                    handler: () => {
                        this.selectFile();
                    }

                }
            );
        }
        actionSheet.present();
    }

    onFileUnselect() {

        this.image = this.file = null;
    }

    fromCamera() {

        const options = this.plannerService.getCameraOptions(
            this.camera.DestinationType.DATA_URL,
            this.camera.PictureSourceType.CAMERA,
            this.camera.EncodingType.JPEG
        );

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
                this.customService.showToast('Error occured, Try again');
            });
    }

    fromLibrary() {
        // console.log('from library.....');
        const options = this.plannerService.getCameraOptions(
            this.camera.DestinationType.DATA_URL,
            this.camera.PictureSourceType.PHOTOLIBRARY,
            this.camera.EncodingType.JPEG
        );

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
                this.showSpinner = false;
                this.customService.showToast('Error occured, Try again');
            });
    }


    selectFile() {
        /**below method results in storing the selected file uri in 'this.file'
         * also performs error handling related to file selection
          */
        this.fileSelectService.chooseFile(this);

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
            start: this.startDateTime.slice(0, -1),
            end: this.endDateTime.slice(0, -1),
            mainAudienceId: this.mainAudience.id
        }

        if (this.location && this.location.trim().length != 0) { data.location = this.location; }

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
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    submitEventWithFile(data: any) {

        data.file = this.file;
        data.fileName = this.fileName;
        data.image = this.image;

        this.customService.showLoader();

        this.plannerService.submitWithFile(data)
            .then((res: any) => {

                console.log('inside finally submit then');
                this.customService.hideLoader();
                alert(JSON.stringify(res));
                let res1 = JSON.parse(res.response);
                this.customService.showToast('Event created successfully');
                this.dismiss(res1);
            })
            .catch((err: any) => {
                console.log('inside finally submit catch');
                this.customService.hideLoader();
                // alert(JSON.stringify(err));

                try {
                    let error = JSON.parse(err.body);
                    let errMsg = (error.message || error.error) ? error.message || error.error : "Some Error Occured,Couldn't Create Circular";
                    this.customService.showToast(errMsg);
                } catch (e) {
                    this.customService.showToast(e.toString() || 'Some unexpected error occured');

                }
            });
    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }

}