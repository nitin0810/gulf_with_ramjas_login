import { Component} from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'moduleEvaluation',
    templateUrl: './module.html',
    styles: [` `]
})

export class ModuleEvaluationPageManagement {

    title: string = "Evaluation";
constructor(
    private modalCtrl: ModalController
){}
    openNewEvaluationModal(){
let modal = this.modalCtrl.create("NewEvaluationPageManagement");
modal.present();

    }
}