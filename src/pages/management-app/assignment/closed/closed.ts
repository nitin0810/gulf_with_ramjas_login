
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CurrentAssignmentPageManagement } from '../current/current';
import { CustomService } from '../../../../services/custom.service';
import { AssignmentService } from '../../../../services/assignment.service';

@IonicPage()
@Component({
    selector: 'closed-assignment',
    templateUrl: './closed.html',
    styles: [` `]
})

export class ClosedAssignmentPageManagement extends CurrentAssignmentPageManagement {

    title: string = "Assignment";

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public assignmentService: AssignmentService
    ) {
        super(modalCtrl, customService, assignmentService);
        this.areAssignmentClosed = true;
    }

    ngOnInit() {
        this.getAssignmentList();
    }

}
