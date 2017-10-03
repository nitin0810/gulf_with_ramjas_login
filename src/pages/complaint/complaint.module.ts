import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';
import { ComplaintSuggestionOptionsModule } from '../../custom-components/compl-suggestion-options/compl-suggestion-options.module';

import { ComplaintPage } from './complaint';
import { SortFilterOptionsModule } from '../../custom-components/sort-filter-options/sort-filter.module';

@NgModule({
  
    declarations: [ComplaintPage],
   
    imports: [
        CustomNavbarModule,
        SortFilterOptionsModule,
        MomentModule,
        ComplaintSuggestionOptionsModule,
        IonicPageModule.forChild(ComplaintPage)
    ],
    
})
export class ComplaintModule { }  