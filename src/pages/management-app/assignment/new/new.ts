
import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { AssignmentService } from '../../../../services/assignment.service';
import { CustomService } from '../../../../services/custom.service';
import { Camera } from '@ionic-native/camera';
import { FileSelectService } from '../../../../services/fileSelect.service';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'new-assignment',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewAssignmentPageManagement {

    title: string = "New Assignment";

    /**ngModal variables */
    description: string;
    dueDate: string = new Date().toISOString().substring(0, 10);
    module: any;
    year: any;
    showSpinner: boolean = false;

    image: any;
    file: any;
    fileName: string;
    /**data required to create the assignment */
    yearList: Array<any>;
    modulesObject: any = {};


    constructor(
        private viewCtrl: ViewController,
        private assignmentService: AssignmentService,
        private customService: CustomService,
        private fileSelectService: FileSelectService,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private platform: Platform

    ) { }

    ngOnInit() {

        this.customService.showLoader();
        this.assignmentService.fetchYears()
            .subscribe((res: any) => {

                this.yearList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    todayDate() {

        return new Date().toISOString().substring(0, 10);
    }

    onYearChange() {

        console.log(this.modulesObject);
        this.module = null;
        if (this.modulesObject[this.year.yearId || this.year.id]) {

            return;
        }
        this.customService.showLoader();
        this.assignmentService.fetchModules(this.year.yearId || this.year.id)
            .subscribe((res: any) => {

                this.modulesObject[this.year.yearId || this.year.id] = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onUploadBtn() {

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

        const options = this.assignmentService.getCameraOptions(
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

            /**handle the case when camera opened, but pitcure not taken */
            // console.log('inisde camera 2nd clbk');
            this.showSpinner = false;
        })
            .catch((err: any) => {
                // console.log('inside camera catch');
                console.log(err);
                this.showSpinner = false;
                this.customService.showToast('Error occured,Try again');
            });
    }

    fromLibrary() {
        // console.log('from library.....');

        const options = this.assignmentService.getCameraOptions(
            this.camera.DestinationType.DATA_URL,
            this.camera.PictureSourceType.PHOTOLIBRARY,
            this.camera.EncodingType.JPEG
        );

        this.showSpinner = true;
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            // console.log('inside library clbk');
            // console.log(imageData);
            this.showSpinner = false;
            this.image = 'data:image/jpeg;base64,' + imageData;
            this.file = null;
        }, (err) => {
            // console.log('inside library 2nd clbk');
            this.showSpinner = false;
        })
            .catch((err) => {
                // Handle error
                console.log('inside library catch ');
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

            title: 'Are you sure to submit the assignment ?',
            buttons: [
                {
                    text: 'Submit',
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

        if (!this.image && !this.file) {
            let data = new FormData();
            data.append('description', this.description);
            data.append('yearId', this.year.yearId || this.year.id);
            data.append('moduleId', this.module.moduleId || this.module.id);
            data.append('dueDate', this.dueDate);

            this.customService.showLoader();
            this.assignmentService.postAssignment(data)
                .subscribe((res: any) => {

                    this.customService.hideLoader();
                    this.customService.showToast('Assignment submitted successfully');
                    this.dismiss(res);
                }, (err: any) => {

                    this.customService.hideLoader();
                    this.customService.showToast(err.msg);
                });
        } else {

            let data: any = {};
            data.description = this.description;
            data.dueDate = this.dueDate;
            data.moduleId = this.module.moduleId || this.module.id;
            data.yearId = this.year.yearId || this.year.id;
            data.image = this.image;
            data.file = this.file;
            data.fileName = this.fileName;

            this.customService.showLoader();

            this.assignmentService.postAssignmentWithFile(data)
                .then((res: any) => {

                    console.log('inside finally submit then');
                    this.customService.hideLoader();
                    // alert(JSON.stringify(res));
                    let res1 = JSON.parse(res.response);
                    this.customService.showToast('Assignment created successfully');
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
    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }
}
