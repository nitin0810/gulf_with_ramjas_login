import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, ActionSheetController, Events,ModalController, NavParams } from 'ionic-angular';

import { CustomService } from '../../../services/custom.service';
import { ComplaintService } from '../../../services/complaint.service';
import { ComplaintSuggestionOptionsBaseClass } from '../../../custom-components/compl-suggestion-base-class';

@IonicPage()
@Component({
    selector: 'view-compaint',
    templateUrl: './view.html',
    styles: [` `]
})

export class ViewComplaintPage extends ComplaintSuggestionOptionsBaseClass{

    title = "VIEW COMPLAINT";
    complaint: any;
    complaintIndex: number;

    constructor(
        public params: NavParams,
        public complaintService: ComplaintService,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        public mdlCtrl: ModalController,
        public customService: CustomService,
        public actionSheetCtrl: ActionSheetController,
        public events: Events
    ) {
        super(mdlCtrl, alertCtrl, actionSheetCtrl, customService, complaintService,events);

        this.complaint = this.params.get('viewCompl');
        this.complaintIndex = this.params.get('index');

        // this.complaint = this.complaintService.sockJsConnection(this.complaint.id);
    
    }
 
    dismiss(){
        this.viewCtrl.dismiss();
    }

}