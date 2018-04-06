
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { AssignmentService } from '../../../../services/assignment.service';
import { CustomService } from '../../../../services/custom.service';
import { GalleryModal } from 'ionic-gallery-modal';

@IonicPage()
@Component({
    selector: 'current-assignment',
    templateUrl: './current.html',
    styles: [` `]
})

export class CurrentAssignmentPageManagement {

    title: string = "Assignment";
    areAssignmentClosed: boolean;
    pageNo: number = 1;
    assignmentList: Array<any>;
    /** 'fetchAssignmentMethod' holds which method to call in assignment.service,
    this is done to reuse the CurrentAssignmentPageManagement component
    */
    fetchAssignmentMethod: any;

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public assignmentService: AssignmentService
    ) {
        this.areAssignmentClosed = false;
        this.fetchAssignmentMethod = this.assignmentService.fetchAssignments;
    }

    ngOnInit() {
        this.getAssignmentList();
    }

    getAssignmentList(refresher?: any) {

        if (!refresher) {
            this.customService.showLoader();
        }
        this.fetchAssignmentMethod.call(this.assignmentService, this.areAssignmentClosed, 1)
            .subscribe((res: any) => {

                this.assignmentList = res.filter((assignment) =>{ return assignment.moduleName == 'English Literature';})
                console.log(this.assignmentList);
                
                if (refresher) {

                    refresher.complete();
                    this.pageNo = 1;
                } else {
                    this.customService.hideLoader();
                }
            }, (err: any) => {

                refresher ? refresher.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openNewAssignmentModal() {
        let modal = this.modalCtrl.create("NewAssignmentPageManagement");
        modal.present();
        modal.onDidDismiss((returnedDate: any) => {
            if (returnedDate) {
                this.assignmentList.unshift(returnedDate);
            }
        });
    }

    doRefresh(refresher: any) {
        this.getAssignmentList(refresher);
    }

    doInfinite(infinite: any) {



        this.fetchAssignmentMethod.call(this.assignmentService, this.areAssignmentClosed, this.pageNo + 1)
            .subscribe((res: any) => {

                this.assignmentList = this.assignmentList.concat(res);
                if (res && res.length != 0) { this.pageNo++; }
                infinite.complete();
            }, (err: any) => {

                infinite.complete();
                this.customService.showToast(err.msg);
            });

    }

    openDocuments(assignMent: any) {

        let fileName = assignMent.files[0].fileOriginalName;
        let fileType = fileName.substring(fileName.lastIndexOf('.') + 1);


        console.log(fileType);

        if (fileType == "jpeg" || fileType == "jpg" || fileType == "png") {

            this.openImages(assignMent);
        } else if (fileType == "pdf" || fileType == "doc" || fileType == "docx" || fileType == "txt") {

            this.openOtherDocs(assignMent);
        }
    }


    openImages(assignMent: any) {

        let photos: Array<any> = [];
        assignMent.files.forEach((file: any) => {

            photos.push({
                url: file.fileUrl
                // url: "https://www.google.co.in/imgres?imgurl=http://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg&imgrefurl=http://www.planwallpaper.com/images&h=1200&w=1600&tbnid=sYibpKnJxiFExM:&tbnh=150&tbnw=200&usg=__1KVXTMMLh1TflUINMeGakPVZBuU=&vet=10ahUKEwjNxebp8LPXAhUGKY8KHRtLDbIQ_B0IfzAM..i&docid=z8O4lWNcsz2mNM&itg=1&sa=X&ved=0ahUKEwjNxebp8LPXAhUGKY8KHRtLDbIQ_B0IfzAM"
            });
        });

        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: 0
        });
        modal.present();
    }


    openOtherDocs(assignMent: any) {
        console.log('opening other docs');

        window.open(assignMent.files[0].fileUrl, '_system', 'location=no');

    }
}
