
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { AssignmentService } from '../../../../services/assignment.service';
import { CustomService } from '../../../../services/custom.service';
import { CurrentAssignmentPageManagement } from '../../../management-app/assignment/current/current';

@IonicPage()
@Component({
    selector: 'current-assignment',
    templateUrl: './current.html',
    styles: [` `]
})

export class CurrentAssignmentPageStudent extends CurrentAssignmentPageManagement {

    title: string = "Assignment";


    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public assignmentService: AssignmentService
    ) {
        super(modalCtrl, customService, assignmentService);
        this.areAssignmentClosed = false;
        this.fetchAssignmentMethod = this.assignmentService.fetchAssignmentsForStudent;

    }

    ngOnInit() {
        this.getAssignmentList();
    }

   
}
