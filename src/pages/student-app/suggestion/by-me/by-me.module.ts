import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

// import { MomentModule } from 'angular2-moment';

import { SuggestionByMeStudent } from './by-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { SortFilterOptionsModule } from '../../../../custom-components/sort-filter-options/sort-filter.module';
import { ComplaintMainModule } from '../../../../custom-components/complaint-main/complaint-main.module';


@NgModule({
  
    declarations: [SuggestionByMeStudent],
   
    imports: [
        CustomNavbarModule,
        SortFilterOptionsModule,
        ComplaintMainModule,
        IonicPageModule.forChild(SuggestionByMeStudent)
    ],
    
})
export class SuggestionByMeModule { }  