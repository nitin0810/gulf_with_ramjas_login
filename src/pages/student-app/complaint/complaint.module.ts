import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComplaintPageStudent } from './complaint';

import { CustomNavbarModule } from '../../../custom-components/navbar/navbar.module';
import { ComplaintMainModule } from '../../../custom-components/complaint-main/complaint-main.module';
import { SortFilterOptionsModule } from '../../../custom-components/sort-filter-options/sort-filter.module';
import { ComplaintSuggestionOptionsModule } from '../../../custom-components/compl-suggestion-options/compl-suggestion-options.module';

@NgModule({
  
    declarations: [ComplaintPageStudent],
   
    imports: [
        CustomNavbarModule,
        SortFilterOptionsModule,
        ComplaintMainModule,
        ComplaintSuggestionOptionsModule,
        IonicPageModule.forChild(ComplaintPageStudent)
    ],
    
})
export class ComplaintModuleStudent { }  