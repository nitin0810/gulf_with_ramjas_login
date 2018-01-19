import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

// @IonicPage()
@Component({
    selector: 'no-results',
    template: `
        <div class="no_records">
            <img src="assets/images/empty.png">
            <div></div>
        </div>
            `
})
export class NoResultsComponent  {
    
    constructor() {}

}