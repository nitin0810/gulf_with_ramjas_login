
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { AssignmentService } from '../../../../services/assignment.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'closed-assignment',
    templateUrl: './current.html',
    styles: [` `]
})

export class CurrentAssignmentPageManagement {

    title: string = "Assignment";
    areAssignmentClosed: boolean;
    pageNo: number = 1;
    assignmentList: Array<any>;

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public assignmentService: AssignmentService
    ) {
        this.areAssignmentClosed = false;
    }

    ngOnInit() {
        this.getAssignmentList();
    }

    getAssignmentList(refresher?: any) {

        if (!refresher) {
            this.customService.showLoader();
        }
        this.assignmentService.fetchAssignments(this.areAssignmentClosed, 1)
            .subscribe((res: any) => {

                this.assignmentList = res;
                refresher ? refresher.complete() : this.customService.hideLoader();
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



        this.assignmentService.fetchAssignments(this.areAssignmentClosed, this.pageNo + 1)
            .subscribe((res: any) => {

                this.assignmentList = this.assignmentList.concat(res);
                if (res && res.length != 0) { this.pageNo++; }
                infinite.complete();
            }, (err: any) => {

                infinite.complete();
                this.customService.showToast(err.msg);
            });

    }


}
