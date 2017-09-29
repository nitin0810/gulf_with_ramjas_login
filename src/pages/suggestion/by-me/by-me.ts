import { Component } from '@angular/core';
import { IonicPage, ModalController, Events } from 'ionic-angular';
import { ComplaintPage } from '../../complaint/complaint';
import { ComplaintService } from '../../../services/complaint.service';
import { CustomService } from '../../../services/custom.service';

@IonicPage()
@Component({
    templateUrl: './by-me.html'
})

export class SuggestionByMe extends ComplaintPage {

    title: string = "SUGGESTIONS";

    constructor(
        public mdlCtrl: ModalController,
        public complaintService: ComplaintService,
        public customService: CustomService,
        public events: Events
    ) {

        super(mdlCtrl, complaintService, customService, events);
        this.complaintService.compOrSugg = "suggestion";
    }
}