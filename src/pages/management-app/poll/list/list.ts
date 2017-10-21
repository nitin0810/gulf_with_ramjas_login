

import { Component, ViewChild,Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'poll-list',
    templateUrl: './list.html',
    styles: [` `]
})

export class ListPollPageManagement {

    @Input() pollList: any;

    constructor() {
        // console.log('List construtor callded');
    }

    openViewPoll(){

    }

}
