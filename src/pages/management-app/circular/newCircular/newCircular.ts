import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController,NavParams } from 'ionic-angular';
import { CircularService } from '../../../../services/circular.service';
import { CustomService } from '../../../../services/custom.service';

import { NewPollPageManagement } from '../../poll/newPoll/newPoll';
import { PollService } from '../../../../services/poll.service';
import { Camera } from '@ionic-native/camera';
import { FileSelectService } from '../../../../services/fileSelect.service';
import { Platform } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'new-circular',
    templateUrl: 'newCircular.html',
    styles: [`

    `]
})
export class NewCircularComponent extends NewPollPageManagement {

    title: string = "New Cirular";

    /** data  required to create the circular*/
    audienceList: Array<any>;
    departmentList: Array<any>;
    programList: Array<any>;
    yearList: Array<any>;
    yearsListForModule: Array<any>;
    modulesObject: any = {}; // stores array of modules(as value) of multiple yearsIds(as property)
    optionTypesPossible: Array<any>;
    optionLimit: number;

    /**ngModal variables */
    mainAudience: any;
    audienceIds: Array<number>; //used when mainAudience is university or department
    departmentIds: Array<any>;   //used only when mainAudience is  department
    programIds: Array<any>;  //used only when mainAudience is  program
    yearIds: Array<any>;  //used only when mainAudience is  program 
    yearForModule: any; // used only when mainAudience is module
    moduleIds: Array<any>; // used only when mainAudience is module

    image: any;
    file: any;
    fileName: string;

    circularTitle: string;
    description: string;
    effectiveDate: any = new Date().toISOString().substring(0, 10);

    showSpinner: boolean = false;

    constructor(
        public pollService: PollService,
        public viewCtrl: ViewController,
        public navParams:NavParams,
        private circularService: CircularService,
        public customService: CustomService,
        private fileSelectService: FileSelectService,
        public actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private platform : Platform
    ) {

        super(viewCtrl, navParams,pollService, customService, actionSheetCtrl);

    }

    ionViewWillEnter() {

        this.setTimeTableInfo(this.navParams.get('timeTableInfo'));
        this.getMainAudeinceData();
    }

    onUploadBtn() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Select Image Using',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => {
                        this.fromCamera();
                    }

                },
                {
                    text: 'Load from Library',
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

        const options = this.circularService.getCameraOptions(
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
        const options = this.circularService.getCameraOptions(
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
            // console.log(imageData);
            this.image = 'data:image/jpeg;base64,' + imageData;
            this.file = null;
        }, (err) => {
            // console.log('inside library 2nd clbk');
            this.showSpinner = false;
        })
            .catch((err) => {
                // Handle error
                // console.log('inside library catch ');
                // console.log(err);
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

            title: 'Are you sure to create the Circular ?',
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

    buildPayload() {

        let data: any = {
            title: this.circularTitle,
            description: this.description,
            mainAudienceId: this.mainAudience.id,
            date: this.effectiveDate
        }

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

        this.circularService.submitCircularWithoutFile(formData)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Circular submitted successfully');
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

        this.circularService.submitCircularWithFile(data)
            .then((res: any) => {

                console.log('inside finally submit then');
                this.customService.hideLoader();
                // alert(JSON.stringify(res));
                let res1 = JSON.parse(res.response);
                this.customService.showToast('Circular created successfully');
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