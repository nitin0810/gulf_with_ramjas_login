import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { ComplaintSuggestionOptionsModule } from '../compl-suggestion-options/compl-suggestion-options.module';

// import { SortFilterOptionsModule } from '../../custom-components/sort-filter-options/sort-filter.module';
import { ComplaintMainPage } from './complaint-main';
import { NoResultsModule } from '../no-results/no-results.module';

@NgModule({
  
    declarations: [ComplaintMainPage],
   
    imports: [
        NoResultsModule,
        // SortFilterOptionsModule,
        MomentModule,
        ComplaintSuggestionOptionsModule,
        IonicPageModule.forChild(ComplaintMainPage)
    ],
    exports:[ComplaintMainPage]
    
})
export class ComplaintMainModule { }  