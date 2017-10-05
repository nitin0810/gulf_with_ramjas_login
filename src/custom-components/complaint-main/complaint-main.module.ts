import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../navbar/navbar.module';
import { MomentModule } from 'angular2-moment';
import { ComplaintSuggestionOptionsModule } from '../compl-suggestion-options/compl-suggestion-options.module';

// import { SortFilterOptionsModule } from '../../custom-components/sort-filter-options/sort-filter.module';
import { ComplaintMainPage } from './complaint-main';

@NgModule({
  
    declarations: [ComplaintMainPage],
   
    imports: [
        CustomNavbarModule,
        // SortFilterOptionsModule,
        MomentModule,
        ComplaintSuggestionOptionsModule,
        IonicPageModule.forChild(ComplaintMainPage)
    ],
    exports:[ComplaintMainPage]
    
})
export class ComplaintMainModule { }  