import { NavParams, ViewController, IonicPage, NavController, PopoverController, ActionSheetController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CustomService } from '../../services/custom.service';
import { TimeTableService } from '../../services/timeTable.service';

@IonicPage()
@Component({
    selector: 'time-table-view',
    templateUrl: './view-timetable.html',
    styles: [` `]
})

export class TimeTableViewPage {

    title: string = 'View Timetable';

    timeTableInfo: any; // details of timetable to be edited
    defaultAvatar: string = "assets/images/user.png";
    isAdmin: boolean;
    timetableEdited: boolean = false;

    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private navCtrl: NavController,
        private popoverCtrl: PopoverController,
        private actionSheetCtrl: ActionSheetController,
        private modalCtrl: ModalController,
        private customService: CustomService,
        private timeTableService: TimeTableService
    ) {

        this.timeTableInfo = this.navParams.get('timeTableInfo');
        this.isAdmin = localStorage.getItem('loginType')=="management" && JSON.parse(localStorage.getItem('roles')).indexOf('ADMIN') > -1;

    }

    ionViewDidEnter() {

        /**check if the view page is stacked above new page, in this case
         * index of view is 1
         * and index of new is 0
         */
        if (this.viewCtrl.index == 1) {
            let newModal: ViewController = this.navCtrl.first(); // returns the NewTT modal page
            newModal.dismiss(this.timeTableInfo);
        }
    }

    presentEditDeleteOption(event: any) {

        const popover = this.popoverCtrl.create("EditDeletePopoverPage");
        popover.present({
            ev: event
        });
        popover.onDidDismiss((selectedOption: string) => {
            console.log('on dismiss', selectedOption);

            if (selectedOption == "edit") {
                this.onEdit();
            }
            else if (selectedOption == "delete") {
                this.onDelete();
            }
        });

    }

    onEdit() {
        const modal = this.modalCtrl.create("TimeTableEditPageManagement", { 'timeTableInfo': this.timeTableInfo });
        modal.present();
        modal.onDidDismiss((editedEntry: any) => {

            if (editedEntry) {

                this.timeTableInfo['operation'] = "edit";
                this.timetableEdited = true;

                /**to store day change information which is used at main TT update the view */
                if (this.timeTableInfo.dayId != editedEntry.dayId) {
                    this.timeTableInfo['dayChanged'] = true;
                }
                /**update the TTInfo to show in the view page as well as
                 * to reflect on main TT page in case day remains unchanged
                 */
                for (let key in this.timeTableInfo) {
                    this.timeTableInfo[key] = editedEntry[key] || this.timeTableInfo[key];
                }

            }

        });
    }

    onDelete() {

        const actionSheet = this.actionSheetCtrl.create({
            title: 'Are you sure to delete this timetable entry ?',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => { this.sendDeleteRequest(this.timeTableInfo); }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => { }
                }
            ]
        });
        actionSheet.present();
    }

    sendDeleteRequest(timeTableInfo: any) {

        this.customService.showLoader();
        this.timeTableService.deleteTimetable(timeTableInfo.id)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Timetable deleted successfully');
                this.timeTableService.deleteTimetableEntry(timeTableInfo.id);
                /**add operation property to differntiate it from edit  */
                res['operation'] = "del";
                this.timetableEdited = false;
                this.dismiss(res);
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    dismiss(res?: any) {

        if (this.timetableEdited) {
            this.viewCtrl.dismiss(this.timeTableInfo);
            return;
        }
        this.viewCtrl.dismiss(res);
    }
}