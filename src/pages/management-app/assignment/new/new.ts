
import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { AssignmentService } from '../../../../services/assignment.service';
import { CustomService } from '../../../../services/custom.service';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

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
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private fileChooser: FileChooser,
        private filePath: FilePath

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
                    text: 'File System(pdf only)',
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
                this.customService.showToast('Error in uploading image');
                this.showSpinner = false;

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
    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }
}
