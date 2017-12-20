import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { CircularService } from '../../../../services/circular.service';
import { CustomService } from '../../../../services/custom.service';

import { NewPollPageManagement } from '../../poll/newPoll/newPoll';
import { PollService } from '../../../../services/poll.service';
import { CameraOptions, Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
    selector: 'new-circular',
    templateUrl: 'newCircular.html'
})
export class NewCircularComponent extends NewPollPageManagement{

    title: string = "New Cirular";
    
    /** data  required to create the circular*/
    audienceList: Array<any>;
    departmentList: Array<any>;
    programList: Array<any>;
    yearList: Array<any>;
    yearsListForModule: Array<any>;
    moduleList: Array<any>;
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

    circularTitle: string;
    description: string;
    effectiveDate: any = new Date().toISOString().substring(0, 10);

    showSpinner: boolean = false;

    constructor(
        public pollService: PollService,        
        public viewCtrl: ViewController,
        private circularService: CircularService,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController,
        private camera: Camera        
    ) {

        super(viewCtrl, pollService, customService, actionSheetCtrl);
        
    }

    ionViewWillEnter() {
        
        this.getMainAudeinceData();
    }

    onUploadBtn() {
        
        const actionSheet = this.actionSheetCtrl.create({

            title: 'Select Image',
            buttons: [
                {
                    text: 'Use Camera',
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
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }

    fromCamera() {

        const options: CameraOptions = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            allowEdit: true,
            // saveToPhotoAlbum: true,
            correctOrientation: true
        }
        this.showSpinner = true;
        this.camera.getPicture(options).then((imageData) => {

            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            // console.log('inside camera clbl');
            this.image = 'data:image/jpeg;base64,' + imageData;
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
            console.log(imageData);
            this.image = 'data:image/jpeg;base64,' + imageData;

        }, (err) => {
            // console.log('inside library 2nd clbk');
            this.showSpinner = false;

        })
        .catch((err) => {
            // Handle error
            console.log('inside library catch ');
            console.log(err);
            this.customService.showToast('Error in uploading image');
            this.showSpinner = false;

        });
    }

    finallySubmit(){


        let data:any = {
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
        
        if (!this.image) {

            var form_data = new FormData();
            
            for ( var key in data ) {
                form_data.append(key, data[key]);
            }

            this.customService.showLoader();
            this.circularService.submitCircular(form_data)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Circular submitted successfully');
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
            });
        } else {
            
            data.imageString = this.image;
            

            // var form_data = new FormData();
            
            // for ( var key in data ) {
            //     form_data.append(key, data[key]);
            // }

            //console.log(form_data);
            this.customService.showLoader();
            this.circularService.postCircularWithFile(data)
            .then((res: any) => {

                this.customService.hideLoader();
                this.customService.showToast('Circular Submitted Successfully');
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

        }

    }
}