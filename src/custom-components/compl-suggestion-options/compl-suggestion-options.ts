
import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'c-s-options',
    templateUrl: './compl-suggestion-options.html',
    styles: [``]

})

export class ComplaintSuggestionOptionsPage {

    @Input() complaint: any;
    constructor() {     }
  

    openCommentModal(){
        console.log('aaaaaaaaaaaaa');
        
    }
    openReopenModal(){

    }
    openCloseModal(){

    }
    openSatisfiedModal(){

    }
}