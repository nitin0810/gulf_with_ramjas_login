import { Component, Input } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'progress-bar',
    template: `
            <div class="progress-outer">
                <div class="progress-inner" [style.width]="progress + '%'" [style.padding.px]="progress==0?0:2">
                   
                </div>
            </div>
            `
})
export class ProgressBarComponent  {

    @Input() progress;

    constructor() {}
    

}