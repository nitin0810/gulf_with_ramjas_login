
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { AssignmentService } from '../../../../services/assignment.service';
import { CurrentAssignmentPageManagement } from '../../../management-app/assignment/current/current';

@IonicPage()
@Component({
    selector: 'closed-assignment',
    templateUrl: './closed.html',
    styles: [` `]
})

export class ClosedElectivePageStudent extends CurrentAssignmentPageManagement {

    title: string = "Elective";

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public assignmentService: AssignmentService
    ) {
        super(modalCtrl, customService, assignmentService);
        this.areAssignmentClosed = true;
        this.fetchAssignmentMethod = this.assignmentService.fetchAssignmentsForStudent;
    }

    ngOnInit() {
        this.getAssignmentList();
    }

}
