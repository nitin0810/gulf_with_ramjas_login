
import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { AssignmentService } from '../../../../services/assignment.service';
import { CustomService } from '../../../../services/custom.service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';

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
    image: any;
    file: any;
    /**data required to create the assignment */
    yearList: Array<any>;
    modulesObject: any = {};

    showSpinner: boolean = false;
    constructor(
        private viewCtrl: ViewController,
        private assignmentService: AssignmentService,
        private customService: CustomService,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private fileChooser: FileChooser
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
                    text: 'File',
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
            console.log(imageData);
            this.image = 'data:image/jpeg;base64,' + imageData;
            this.file = null;
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
                });
        } else {

            let data: any = {};
            data.description = this.description;
            data.dueDate = this.dueDate;
            data.moduleId = this.module.moduleId || this.module.id;
            data.yearId = this.year.yearId || this.year.id;
            data.image = this.image ;
            data.file = this.file;
            
            this.customService.showLoader();

            this.assignmentService.postAssignmentWithFile(data)
                .then((res: any) => {

                    // console.log('inside finally submit then');
                    this.customService.hideLoader();
                    this.customService.showToast('Assignment submitted successfully');
                    this.dismiss(res);
                }, (err: any) => {

                    // alert(JSON.stringify(err.body));
                    // console.log('inside finally submit catch');
                    this.customService.hideLoader();
                    let errMsg = JSON.parse(err.body).message;
                    this.customService.showToast(errMsg);
                });

        }
    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }
}
