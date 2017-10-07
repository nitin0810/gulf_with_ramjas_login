
import { Component, Input } from '@angular/core';
import { IonicPage, Events, NavParams, ViewController,ModalController, ActionSheetController } from 'ionic-angular';
import { CustomService } from '../../services/custom.service';
import { ComplaintService } from '../../services/complaint.service';

@IonicPage()
@Component({
    selector: 'edit-complaint',
    templateUrl: './edit-complaint.html',
    styles: [``]

})

export class ComplaintEditPage {

    title: string = "Edit complaint";
    complaint: any;
    complaintIndex: number;

    //form variables
    assignTo: string;
    priority: string;
    priorityList: Array<any>;
    inProgress: boolean;
    complaintEdited: boolean = false;

    constructor(

        private complaintService: ComplaintService,
        private customService: CustomService,
        private navParam: NavParams,
        private viewCtrl: ViewController,
        private actionSheetCtrl: ActionSheetController,
        private mdlCtrl:ModalController,
        private events: Events
    ) {

        this.complaint = this.navParam.get('complaint');
        this.complaintIndex = this.navParam.get('complaintIndex');
        this.priorityList = JSON.parse(localStorage.getItem('complaintPriorityList'));
    }

onAssignedToBtn(){
    let searchPage = this.mdlCtrl.create("FacultySearchPage" );
    searchPage.present();
}


    onEditBtn() {
        console.log(this.assignTo);
        console.log(this.priority);
        console.log(this.inProgress);

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure to change the status ?',
            buttons: [
                {
                    text: 'Yes',

                    handler: () => {
                        this.submitFinally();
                    }
                }, {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }

    submitFinally() {

        let status: any = {
            assignedTo: 778824662,

            priority: this.priority
        };
        if (this.inProgress) { status.statusId = 3; }

        this.customService.showLoader();
        this.complaintService.editComplaint(this.complaint.id, status)
            .subscribe((res: any) => {

                this.complaint = res;
                this.complaintEdited = true;
                this.customService.hideLoader();
                this.customService.showToast('Complaint closed successfully');
                // this.dismiss();
            }, (err: any) => {

                this.complaintEdited = false;
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    dismiss() {

        // if (this.complaintEdited) {
        //     this.events.publish("complaintEdited", this.complaint, this.complaintIndex);
        // }
        this.viewCtrl.dismiss();
    }
}



