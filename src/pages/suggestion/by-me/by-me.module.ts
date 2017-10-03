import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { MomentModule } from 'angular2-moment';
import { ComplaintSuggestionOptionsModule } from '../../../custom-components/compl-suggestion-options/compl-suggestion-options.module';

import { CustomNavbarModule } from '../../../custom-components/navbar/navbar.module';
import { SuggestionByMe } from './by-me';
import { SortFilterOptionsModule } from '../../../custom-components/sort-filter-options/sort-filter.module';


@NgModule({
  
    declarations: [SuggestionByMe],
   
    imports: [
        CustomNavbarModule,
        SortFilterOptionsModule,
        ComplaintSuggestionOptionsModule,
        MomentModule,
        IonicPageModule.forChild(SuggestionByMe)
    ],
    
})
export class SuggestionByMeModule { }  