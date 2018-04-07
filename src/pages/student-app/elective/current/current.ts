
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

export class CurrentElectivePageStudent extends CurrentAssignmentPageManagement {

    title: string = "Elective";
    papers = [ 
        {
            name : 'Music', 
            faculty : 'Dr. Suresh Kumar',
            details : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
        },
        {
            name : 'Physical Education',
            faculty : 'Dr. (Ms.) Suman Sharma ',
            details : 'Magnam asperiores quod doloribus ipsa dolor inventore veniam laudantium animi voluptate obcaecati' 
        },
        {
            name : 'Introduction to C',
            faculty : '	Dr. (Ms.) Nalini Nigam',
            details : 'obcaecati vel iure deleniti fugit possimus laboriosam mollitia, unde esse quidem?' 
        }
    ]

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
        // this.getAssignmentList();
        
    }

   submit(){
       this.customService.showToast('Thanks For Submitting Your Elective Choice');
   }
}
