import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'progress-bar',
    template: `
            <div class="progress-outer">
                <div class="progress-inner" [style.width]="progress + '%'">
                   
                </div>
            </div>
            `
})
export class ProgressBarComponent {

    @Input() progress;

    constructor() { }

}