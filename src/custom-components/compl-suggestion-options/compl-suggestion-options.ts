
import { Component, Input } from '@angular/core';
import { IonicPage, ModalController, AlertController, ActionSheetController, Events } from 'ionic-angular';
import { CustomService } from '../../services/custom.service';
import { ComplaintSuggestionOptionsBaseClass } from '../compl-suggestion-base-class';
import { ComplaintService } from '../../services/complaint.service';

@IonicPage()
@Component({
    selector: 'c-s-options',
    templateUrl: './compl-suggestion-options.html',
    styles: [``]

})

export class ComplaintSuggestionOptionsPage extends ComplaintSuggestionOptionsBaseClass {

    @Input() complaint: any;
    @Input() complaintIndex: any;
    
    compalintStatusChanged:boolean;
    isStudent:boolean;
    constructor(
        public mdlCtrl: ModalController,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public customService: CustomService,
        public complaintService: ComplaintService,
        public events: Events
    ) {
        super(mdlCtrl, alertCtrl, actionSheetCtrl, customService, complaintService,events);
this.isStudent = localStorage.getItem('isStudent')==="true";
        
    }
   



}