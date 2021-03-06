import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavParams } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { PlannerService } from '../../../../services/planner.service';

import { Camera } from '@ionic-native/camera';
import { FileSelectService } from '../../../../services/fileSelect.service';
import { Platform } from 'ionic-angular';




@IonicPage()
@Component({
    selector: 'edit-planner',
    templateUrl: './edit.html',
    styles: [` `]
})

export class EditPlannerPageManagement {

    title: string = "Edit Event";

    minDate: any = new Date().toISOString().substring(0, 10);
    isEndGreaterThanStart: boolean = true;

    eventOld: any; //data obtained from the navParams
    eventNew: any;// copy of the eventOld
    eventEdited: boolean = false; // to send the data to back pages in case event is changed

    file: any;
    fileName: string;
    image: any;
    showSpinner: boolean = false;

    constructor(
        private viewCtrl: ViewController,
        private customService: CustomService,
        private actionSheetCtrl: ActionSheetController,
        private navParams: NavParams,
        private plannerService: PlannerService,
        private fileSelectService: FileSelectService,
        private camera: Camera,
        private platform:Platform

    ) {

        this.eventOld = this.navParams.get('event');
        this.eventNew = Object.assign({}, this.eventOld);
        this.onEndDateChange();//to initialze the isEndGreaterThanStart 
    }

    onEndDateChange() {

        if (new Date(this.eventNew.end) < new Date(this.eventNew.start)) {
            this.isEndGreaterThanStart = false;
            this.customService.showToast("End Date should be later than Start Date");
            return;
        }
        this.isEndGreaterThanStart = true;
    }


    onEditBtn() {
        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to edit the event ?',
            buttons: [
                {
                    text: 'Edit',
                    role: 'destructive',
                    handler: () => {
                        this.editFinally();
                    }

                },
                {
                    text: 'Cancel',
                    handler: () => { }
                }
            ]
        });

        actionSheet.present();
    }

    editFinally() {

        /**only info that has been changed are to be sent  */
        let data: any = {};
        if (this.eventNew.title !== this.eventOld.title) { data.title = this.eventNew.title; }
        if (this.eventNew.description !== this.eventOld.description) { data.description = this.eventNew.description; }
        if (this.eventNew.location !== this.eventOld.location) { data.location = this.eventNew.location; }
        if (this.eventNew.start !== this.eventOld.start) {
            /**both start and end date is to be sent even if only one has been changed
             * This is required at the server side
             */
            this.eventNew.start = data.start = this.eventNew.start.charAt(this.eventNew.start.length - 1) == "Z" ? this.eventNew.start.slice(0, -1) : this.eventNew.start;
            this.eventNew.end = data.end = this.eventNew.end.charAt(this.eventNew.end.length - 1) == "Z" ? this.eventNew.end.slice(0, -1) : this.eventNew.end;
        }
        if (this.eventNew.end !== this.eventOld.end) {

            this.eventNew.start = data.start = this.eventNew.start.charAt(this.eventNew.start.length - 1) == "Z" ? this.eventNew.start.slice(0, -1) : this.eventNew.start;
            this.eventNew.end = data.end = this.eventNew.end.charAt(this.eventNew.end.length - 1) == "Z" ? this.eventNew.end.slice(0, -1) : this.eventNew.end;
        }

        if (Object.keys(data).length == 0) {
            this.customService.showToast('No Event info is edited');
            return;
        }
        this.sendEditRequest(data);
    }

    sendEditRequest(data: any) {

        this.customService.showLoader();
        this.plannerService.editEvent(this.eventNew.id, data)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Event Edited Successfully');
                this.eventEdited = true;
                this.dismiss();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onDeleteFile(file: any, index: number) {
        // console.log('on Delete file',file,index);

        this.customService.showLoader('Deleting File...');
        this.plannerService.deleteEventFile(this.eventNew.id, file.fileUrl)
            .subscribe((res: any) => {

                // alert(JSON.stringify(res));
                this.customService.hideLoader();
                this.eventNew.files.splice(index, 1);
                this.eventNew.fileCount != 0 && (this.eventNew.fileCount--);
                this.eventEdited = true;
                this.customService.showToast('File deleted successfuly');
            }, (err: any) => {

                // alert(JSON.stringify(err));
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onAddFile() {

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
            this.customService.showToast('Error occured, Try again');
        })
            .catch((err) => {
                // Handle error
                // console.log('inside library catch ');
                this.customService.showToast('Error in uploading image');
                this.showSpinner = false;

            });
    }


    selectFile() {

        /**below method results in storing the selected file uri in 'this.file'
        * also performs error handling related to file selection
         */
        this.fileSelectService.chooseFile(this);
    }

    onFileUnselect() {

        this.image = this.file = null;
    }


    onUploadFile() {

        let data: any = {};
        data.file = this.file;
        data.fileName = this.fileName;
        data.image = this.image;
        data.eventId = this.eventNew.id;

        this.customService.showLoader('Adding File...');

        this.plannerService.addFileToEvent(data)
            .then((res: any) => {

                console.log('inside finally  submit then of edit');
                // alert(JSON.stringify(res));
                let res1 = JSON.parse(res.response);
                this.customService.hideLoader();
                this.customService.showToast('File added successfully');
                this.file = this.image = null;
                this.updateEventDataAfterUpload(res1[0]); //res is an array of files with only one file in this case
                this.eventEdited = true;
            }, (err: any) => {

                console.log('inside finally submit catch of edit');
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

    updateEventDataAfterUpload(file: any) {

        if (this.eventNew.fileCount == 0) {
            this.eventNew.files = [];
        }
        this.eventNew.files.push(file);
        this.eventNew.fileCount++;
    }


    dismiss() {

        if (this.eventEdited) {
            this.viewCtrl.dismiss(this.eventNew);
        } else {
            this.viewCtrl.dismiss();
        }
    }
}