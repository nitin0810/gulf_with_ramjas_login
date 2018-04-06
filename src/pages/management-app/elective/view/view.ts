
import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavController, NavParams, DateTime } from 'ionic-angular';
import { CircularService } from '../../../../services/circular.service';
import { CustomService } from '../../../../services/custom.service';
import { GalleryModal } from 'ionic-gallery-modal';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
    selector: 'view-circular',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewElectivePageManagement {

    title: string = "View Elective";
    circularId: number; // recieved from navparams
    circular: any; // complete circular info to be fetched from server
    showInfo: boolean = true;
    fileCount: number = 0;
    constructor(
        private navparam: NavParams,
        private viewCtrl: ViewController,
        private modalCtrl: ModalController,
        private circularService: CircularService,
        private customService: CustomService
    ) {
        this.circularId = this.navparam.get('circularId');
        // this.getCircularInfo();
    }

    getCircularInfo() {

        this.customService.showLoader();
        this.circularService.fetchCircularById(this.circularId)
            .subscribe((res: any) => {

                this.circular = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    onFileClick(file: any, index: number) {

        let fileType = this.giveFileType(file);

        console.log(fileType);

        if (fileType == "jpeg" || fileType == "jpg" || fileType == "png") {

            this.openImages(this.circular.files, index);
        } else if (fileType == "pdf" || fileType == "doc" || fileType == "docx" || fileType == "txt") {

            this.openOtherDocs(file);
        } else {
            this.customService.showToast('Unsupported File Format');
        }
    }

    giveFileType(file: any) {
        return file.fileOriginalName.substring(file.fileOriginalName.lastIndexOf('.') + 1);
    }

    openImages(files: any, index: number) {

        let photos: Array<any> = [];
        files.forEach((file: any) => {

            if (this.giveFileType(file) == "jpeg" || this.giveFileType(file) == "jpg" || this.giveFileType(file) == "png") {
                photos.push({
                    url: file.fileUrl
                });
            }
        });

        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: index
        });
        modal.present();
    }


    openOtherDocs(file: any) {
        console.log('opening other docs');

        window.open(file.fileUrl, '_system', 'location=no');

    }
}