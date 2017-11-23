import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { NewPollPageManagement } from '../../poll/newPoll/newPoll';
import { PollService } from '../../../../services/poll.service';
import { PlannerService } from '../../../../services/planner.service';

import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';




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
        private camera: Camera,
        private fileChooser: FileChooser,
        private filePath: FilePath

    ) {
        super(viewCtrl, pollService, customService, actionSheetCtrl);
        this.startDateTime = this.endDateTime = this.minDate=this.getCorrectISOStringDate();

    }

    ionViewWillEnter() {

        this.getMainAudeinceData();
    }

    getCorrectISOStringDate() {

        /**new Date().toISOString returns incorrrect time( by ignoring the time zone)
         * hence, this method has been made to get the correct isoString time
        */
        let today:any = new Date();
        today.setHours(today.getHours()+1);
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
                this.customService.showToast('Error in uploading image');
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
                this.customService.showToast('Error in uploading image');

            });
    }


    selectFile() {

        /**We Want the file path to be native(i.e starting with file://)
         * so that we can extract the file name and type from the path.
         * Hence resolve the url when recieved as starting from content:// 
         */
        this.fileChooser.open()
            .then(uri => {
                if (uri.startsWith("content://")) {

                    this.filePath.resolveNativePath(uri)
                        .then(nativeUri => {

                            this.file = nativeUri;
                            // console.log(nativeUri);
                            this.image = null;
                            this.fileName = this.file.split('/').pop();
                            this.checkCompatibleFile(this.fileName);
                        }, (err: any) => {
                            /**files path from google drive are not convertable to native path */
                            let errMsg = err.message + "\nYou might be uploading a file from cloud/Google drive";
                            this.customService.showToast(errMsg);
                        });
                } else {

                    this.file = uri;
                    this.image = null;
                    this.fileName = this.file.split('/').pop();
                    this.checkCompatibleFile(this.fileName);
                }
            }, (err: any) => {
                // console.log('inside 2nd clllll');

                alert('Unable to Choose the file at the moment');
            })
            .catch(e => {
                // console.log('inside catch//////');

                alert(JSON.stringify(e));
            });
    }

    checkCompatibleFile(name: string) {
        let type = name.slice(name.lastIndexOf('.') + 1);
        if (!(type == "pdf" || type == "jpg" || type == "jpeg" || type == "png" || type == "doc" || type == "docx" || type == "txt")) {
            this.file = null;
            this.customService.showToast('Unsupported File Type');
        }
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

                // console.log('inside finally submit then');
                // alert(JSON.stringify(res));

                this.customService.hideLoader();
                this.customService.showToast('Event created successfully');
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                let errMsg = JSON.parse(err.body).message || 'Some Error Occured';
                alert(JSON.stringify(errMsg));
            })
            .catch((err: any) => {
                // console.log('inside finally submit catch');
                // alert(JSON.stringify(err.body));
                this.customService.hideLoader();
                let errMsg = JSON.parse(err.body).message || 'Some Error Occured';
                alert(JSON.stringify(errMsg));
            });
    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }

}