import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { SuggestionForMeManagement } from './for-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { SortFilterOptionsModule } from '../../../../custom-components/sort-filter-options/sort-filter.module';
import { ComplaintMainModule } from '../../../../custom-components/complaint-main/complaint-main.module';


@NgModule({
  
    declarations: [SuggestionForMeManagement],
   
    imports: [
        CustomNavbarModule,
        SortFilterOptionsModule,
        ComplaintMainModule,
        IonicPageModule.forChild(SuggestionForMeManagement)
    ],
    
})
export class SuggestionForMeModule { }  