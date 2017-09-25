import { Component } from '@angular/core';
import { NavParams, IonicPage, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'comments',
    template: `
        <ion-header>
             <nl-modal-navbar [title]="title" (modalClosed)="dismiss()"></nl-modal-navbar>
        </ion-header>
         <ion-content class="csGrayBackground">
            <p>comments page......</p>
            {{complaint | json}}
        </ion-content>
            `,
    styles: [`

  `]
})
export class CommentsPage {

    title: string = "Comments";
    complaint: any;

    constructor(
        private navParam: NavParams,
        private viewCtrl: ViewController
    ) {
        this.complaint = this.navParam.get('complaint');
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}