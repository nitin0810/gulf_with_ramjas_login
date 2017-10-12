
import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CustomService } from '../services/custom.service';
import { ComplaintService } from '../services/complaint.service';

export class ComplaintSuggestionOptionsBaseClass {

    complaint: any;
    complaintIndex: number;

    constructor(
        public mdlCtrl: ModalController,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public customService: CustomService,
        public complaintService: ComplaintService,
        public events: Events
    ) { }

    closeComplaint() {

        let alert = this.alertCtrl.create({
            title: 'Do you really want to close ? ',
            inputs: [
                {
                    name: 'description',
                    placeholder: 'Write short description'
                },

            ],
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Yes',
                    handler: data => {
                        if (data.description.trim().length == 0) {
                            this.customService.showToast('Description is required ');
                            return;
                        }
                        this.closeFinally(data.description);

                    }
                }
            ]
        });
        alert.present();
    }

    closeFinally(description: string) {

        this.customService.showLoader();
        this.complaintService.closeComplaint(this.complaint.id, {comment:description})
            .subscribe((res: any) => {

                this.complaint = res;
                this.customService.hideLoader();
                this.customService.showToast('Complaint closed successfully');
                this.events.publish('complaintClosed', res, this.complaintIndex);

            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    reOpenComplaint() {

        let alert = this.alertCtrl.create({
            title: 'If you are not happy with the resolution, you can reopen ',
            inputs: [
                {
                    name: 'description',
                    placeholder: 'Write short description'
                },

            ],
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Yes',
                    handler: data => {
                        if (data.description.trim().length == 0) {
                            this.customService.showToast('Description is required ');
                            return;
                        }
                        this.reOpenFinally(data.description);

                    }
                }
            ]
        });
        alert.present();
    }

    reOpenFinally(description: string) {

        this.customService.showLoader();
        this.complaintService.reOpenComplaint(this.complaint.id, description)
            .subscribe((res: any) => {

                this.complaint = res;
                this.customService.hideLoader();
                this.customService.showToast('Complaint reopend successfully');
                this.events.publish('complaintReOpened', res, this.complaintIndex);

            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }



    satisfyComplaint() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Are you satisfied with the resolution ?',
            buttons: [

                {
                    text: 'Yes',
                    handler: () => {
                        this.satisfyFinally();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'destructive',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }

    satisfyFinally() {
        
        this.customService.showLoader();
        this.complaintService.satisfyComplaint(this.complaint.id)
            .subscribe((res: any) => {

                this.complaint = res;
                this.customService.hideLoader();
                this.customService.showToast('Status changed to satisfied successfully ');
                this.events.publish('complaintSatisfied', res, this.complaintIndex);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    editComplaint() {

        let editPage = this.mdlCtrl.create("ComplaintEditPage", { 'complaint': this.complaint, 'complaintIndex': this.complaintIndex });
        editPage.present();

    }
    openClosePage() {
        
        let closePage = this.mdlCtrl.create("ComplaintCloseManagementPage", { 'complaint': this.complaint, 'complaintIndex': this.complaintIndex });
        closePage.present();
    }
    openCommentPage() {

        let commentPage = this.mdlCtrl.create("CommentsPage", { 'complaint': this.complaint, 'complaintIndex': this.complaintIndex });
        commentPage.present();
    }
}