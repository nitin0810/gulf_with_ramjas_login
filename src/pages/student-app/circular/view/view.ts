import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController,ModalController} from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { CircularService } from '../../../../services/circular.service';
import { GalleryModal } from 'ionic-gallery-modal';


@IonicPage()
@Component({
    selector: 'circular-view',
    templateUrl: './view.html',
    styles: [` `]
})

export class CircularStudentViewPage {

    title: string = "View";
    circular: any;

    constructor(
        private customService: CustomService,
        private circularService: CircularService,
        private navParam: NavParams,
        private viewCtrl:ViewController,
        private modalCtrl:ModalController
    ) {
        this.circular = this.navParam.get('circularData');
    }

    
    onFileClick(file: any, index: number) {

        let fileType = this.giveFileType(file);

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

    // ngOnInit() {

    //     this.getCircular();
    // }

    // getCircular() {
    //     this.customService.showLoader();
    //     this.circularService.fetchCircularById(this.id)
    //         .subscribe((res: any) => {
    //             this.circular = res;
    //             this.customService.hideLoader();
    //         }, (err: any) => {
    //             this.customService.hideLoader();
    //             this.customService.showToast(err.msg);
    //         });
    // }

    dismiss(){
        this.viewCtrl.dismiss();
    }
}