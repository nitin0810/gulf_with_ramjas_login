
import { Component, Input } from '@angular/core';
import { IonicPage, Events, NavParams, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
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
    assignTo:any;
    assignToName: string;
    priority: string;
    priorityList: Array<any>;
    inProgress: boolean;
    complaintEdited: boolean = false;


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
    }

    onAssignedToBtn() {

        this.searchList = [];
        for (let i = 1; i <= 50; i++) {
            let n = Math.floor(Math.random() * 10);
            let name: String = '';
            switch (n) {
                case 0: name = "n";
                    break;
                case 1: name = "ni"; break;
                case 2: name = "nit"; break;
                case 3: name = "niti"; break;
                case 4: name = "nitin"; break;
                case 5: name = "NIter"; break;
                case 6: name = "abah"; break;
                case 7: name = "byr"; break;
                // case 8: name = "78"; break;
                case 9: name = "nitin445";
            }

            this.searchList.push({ id: i, name: name });
        }


        let searchPage = this.mdlCtrl.create("FacultySearchPage", { 'searchList': this.searchList, 'title': 'Faculty' });
        searchPage.present();
        searchPage.onDidDismiss((selected) => { 
            if (selected) { 

            this.assignTo = selected.selectedSearch;
             this.assignToName = selected.selectedSearch.name 
            } });
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



