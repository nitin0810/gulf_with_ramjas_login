import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavParams, ModalController } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { PlannerService } from '../../../../services/planner.service';
import { GalleryModal } from 'ionic-gallery-modal';


@IonicPage()
@Component({
    selector: 'view-planner',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewPlannerPageManagement {

    title: string = "View Event";
    eventId: number;
    event: any;
    eventChange: string;

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController,
        private plannerService: PlannerService,
        private customService: CustomService
    ) {
        this.eventId = this.navParams.get('eventId');
    }

    ngOnInit() {

        this.customService.showLoader();
        this.plannerService.fetchEventsById(this.eventId)
            .subscribe((res: any) => {
                this.event = res;
                this.event.startTime = new Date(res.start);
                this.event.endTime = new Date(res.end);
                // this.event.noOfDays = this.daysBtwnDates(res.endTime, res.startTime);
                this.customService.hideLoader();
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    onFileClick(file: any, index: number) {

        let fileType = this.giveFileType(file);

        console.log(fileType);

        if (fileType == "jpeg" || fileType == "jpg" || fileType == "png") {

            this.openImages(this.event.files, index);
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
console.log(file.fileUrl);

        window.open(file.fileUrl, '_system', 'location=no');

    }

    onEditBtn() {

        const modal = this.modalCtrl.create("EditPlannerPageManagement", { 'event': this.event });
        modal.present();
        modal.onDidDismiss((returnedData: any) => {
            if (returnedData) {
                console.log('inside view ts ondiddismiss', returnedData);

                this.event = returnedData;
                /**reassigning the startTime and endTime in required format */
                this.event.startTime = new Date(this.event.start);
                this.event.endTime = new Date(this.event.end);
                // this.event.files = returnedData.files;
                this.eventChange = "edited";
            }
        });
    }

    onDeleteBtn() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to delete the event ?',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        this.deleteFinally();
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

    deleteFinally() {

        this.customService.showLoader();
        this.plannerService.deleteEvent(this.eventId)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.eventChange = "deleted";
                this.customService.showToast('Event Deleted successfully');
                this.dismiss();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss() {

        if (this.eventChange) {
            this.viewCtrl.dismiss({ 'op': this.eventChange, 'newData': this.event });//newData is only to be used in edited case
        } else {
            this.viewCtrl.dismiss();
        }

    }
}   
