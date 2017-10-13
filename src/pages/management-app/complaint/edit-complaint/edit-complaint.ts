
import { Component, Input } from '@angular/core';
import { IonicPage, Events, NavParams, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
import { ComplaintService } from '../../../../services/complaint.service';
import { CustomService } from '../../../../services/custom.service';

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
    assignTo: any;
    assignToName: string;
    priority: string;
    priorityList: Array<any>;
    inProgress: boolean;
    complaintEdited: boolean = false;
    facultyList: Array<any>;

    searchList: Array<any>;
    constructor(

        private complaintService: ComplaintService,
        private customService: CustomService,
        private navParam: NavParams,
        private viewCtrl: ViewController,
        private actionSheetCtrl: ActionSheetController,
        private mdlCtrl: ModalController,
        private events: Events
    ) {

        this.complaint = this.navParam.get('complaint');
        this.complaintIndex = this.navParam.get('complaintIndex');
        this.priorityList = JSON.parse(localStorage.getItem('complaintPriorityList'));
        this.facultyList = JSON.parse(localStorage.getItem('complaintFaculties'));
    }

    onAssignedToBtn() {

        let searchPage = this.mdlCtrl.create("FacultySearchPage", { 'searchList': this.facultyList, 'title': 'Faculty' });
        searchPage.present();
        searchPage.onDidDismiss((selected) => {
            if (selected) {

                this.assignTo = selected.selectedSearch;
                this.assignToName = selected.selectedSearch.name;

            }
        });
    }


    onEditBtn() {

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
            assignedTo: this.assignTo && this.assignTo.id,
            priority: this.priority
        };
        if (this.inProgress) { status.statusId = 3; }

        this.customService.showLoader();
        this.complaintService.editComplaint(this.complaint.id, status)
            .subscribe((res: any) => {

                this.complaint = res;
                this.complaintEdited = true;
                this.customService.hideLoader();
                this.customService.showToast('Complaint Edited successfully');
                this.dismiss();
            }, (err: any) => {

                this.complaintEdited = false;
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    dismiss() {

        if (this.complaintEdited) {
            this.events.publish("complaintEdited", this.complaint, this.complaintIndex);
        }
        this.viewCtrl.dismiss();
    }
}



