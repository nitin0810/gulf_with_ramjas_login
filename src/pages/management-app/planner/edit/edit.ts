import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavParams } from 'ionic-angular';

import { CustomService } from '../../../../services/custom.service';
import { NewPollPageManagement } from '../../poll/newPoll/newPoll';
import { PollService } from '../../../../services/poll.service';
import { PlannerService } from '../../../../services/planner.service';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { ForgotPasswordModal } from '../../../../custom-components/login/forgot-password/forgot-password';
import { TimeAgoPipe } from 'angular2-moment/time-ago.pipe';





@IonicPage()
@Component({
    selector: 'edit-planner',
    templateUrl: './edit.html',
    styles: [` `]
})

export class EditPlannerPageManagement {

    title: string = "Edit Event";

    minDate: any = new Date().toISOString().substring(0, 10);
    isEndGreaterThanStart: boolean = true;

    eventOld: any; //data obtained from the navParams
    eventNew: any;// copy of the eventOld

    file: any;
    fileName: string;
    image: any;
    showSpinner: boolean = false;

    constructor(
        private viewCtrl: ViewController,
        private customService: CustomService,
        private actionSheetCtrl: ActionSheetController,
        private navParams: NavParams,
        private plannerService: PlannerService,
        private camera: Camera,
        private fileChooser: FileChooser,
        private filePath: FilePath

    ) {

        this.eventOld = this.navParams.get('event');
        this.eventNew = Object.assign({}, this.eventOld);
        this.onEndDateChange();//to initialze the isEndGreaterThanStart 
    }

    onEndDateChange() {

        if (new Date(this.eventNew.end) < new Date(this.eventNew.start)) {
            this.isEndGreaterThanStart = false;
            this.customService.showToast("End Date should be later than Start Date");
            return;
        }
        this.isEndGreaterThanStart = true;
    }


    onEditBtn() {
        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to edit the event ?',
            buttons: [
                {
                    text: 'Edit',
                    role: 'destructive',
                    handler: () => {
                        this.editFinally();
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

    editFinally() {

        /**only info that has been changed are to be sent  */
        let data: any = {};
        if (this.eventNew.title !== this.eventOld.title) { data.title = this.eventNew.title; }
        if (this.eventNew.description !== this.eventOld.description) { data.description = this.eventNew.description; }
        if (this.eventNew.location !== this.eventOld.location) { data.location = this.eventNew.location; }
        if (this.eventNew.start !== this.eventOld.start) {
            /**both start and end date is to be sent even if only on has been changed
             * This is required at the server side
             */
            this.eventNew.start = data.start = this.eventNew.start.charAt(this.eventNew.start.length - 1) == "Z" ? this.eventNew.start.slice(0, -1) : this.eventNew.start;
            this.eventNew.end = data.end = this.eventNew.end.charAt(this.eventNew.end.length - 1) == "Z" ? this.eventNew.end.slice(0, -1) : this.eventNew.end;
        }
        if (this.eventNew.end !== this.eventOld.end) {

            this.eventNew.start = data.start = this.eventNew.start.charAt(this.eventNew.start.length - 1) == "Z" ? this.eventNew.start.slice(0, -1) : this.eventNew.start;
            this.eventNew.end = data.end = this.eventNew.end.charAt(this.eventNew.end.length - 1) == "Z" ? this.eventNew.end.slice(0, -1) : this.eventNew.end;
        }

        if (Object.keys(data).length == 0) {
            this.customService.showToast('No Event info is edited');
            return;
        }
        this.sendEditRequest(data);
    }

    sendEditRequest(data: any) {

        this.customService.showLoader();
        this.plannerService.editEvent(this.eventNew.id, data)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Event Edited Successfully');
                this.dismiss(this.eventNew);
            }, (err: any) => {
                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }
}