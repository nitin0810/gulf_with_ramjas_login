
import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { AssignmentService } from '../../../../services/assignment.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'new-assignment',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewAssignmentPageManagement {

    title: string = "New Assignment";

    /**ngModal variables */
    description: string;
    dueDate: string = new Date().toISOString().substring(0, 10);
    module: any;
    year: any;

    /**data required to create the assignment */
    yearList: Array<any>;
    modulesObject: any = {};


    constructor(
        private viewCtrl: ViewController,
        private assignmentService: AssignmentService,
        private customService: CustomService,
        private actionSheetCtrl: ActionSheetController
    ) { }

    ngOnInit() {

        this.customService.showLoader();
        this.assignmentService.fetchYears()
            .subscribe((res: any) => {

                this.yearList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    todayDate() {

        return new Date().toISOString().substring(0, 10);
    }

    onYearChange() {

        console.log(this.modulesObject);
        this.module = null;
        if (this.modulesObject[this.year.yearId || this.year.id]) {

            return;
        }
        this.customService.showLoader();
        this.assignmentService.fetchModules(this.year.yearId || this.year.id)
            .subscribe((res: any) => {

                this.modulesObject[this.year.yearId || this.year.id] = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    onSubmit() {

        const actionSheet = this.actionSheetCtrl.create({

            title: 'Are you sure to submit the assignment ?',
            buttons: [
                {
                    text: 'Submit',
                    handler: () => {
                        this.finallySubmit();
                    }

                },
                {
                    text: 'Cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();

    }

    finallySubmit() {

        let data = new FormData();
        data.append('description', this.description);
        data.append('yearId', this.year.yearId || this.year.id );
        data.append('moduleId', this.module.moduleId || this.module.id);
        data.append('dueDate', this.dueDate);

        this.customService.showLoader();
        this.assignmentService.postAssignment(data)
            .subscribe((res: any) => {
                this.customService.hideLoader();
                this.customService.showToast('Assignment submitted successfully');
                this.dismiss(res);
            }, (err: any) => {
                this.customService.hideLoader();
            });

    }

    dismiss(res?: any) {

        this.viewCtrl.dismiss(res);
    }
}
