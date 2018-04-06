import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, Modal } from 'ionic-angular';
import { CurrentElectivePageComponent } from '../currentCircular/currentCircular';
import { CustomService } from '../../../../services/custom.service';
import { CircularService } from '../../../../services/circular.service';

@IonicPage()
@Component({
    selector: 'closedCicular',
    templateUrl: 'closedCircular.html'
})
export class ClosedElectivePageComponent extends CurrentElectivePageComponent{

    title: string = "Circular";
    expiredRequest: boolean;

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public circularService: CircularService
    ){
        super(modalCtrl, customService, circularService);
        this.expiredRequest = true;
    }

    
}