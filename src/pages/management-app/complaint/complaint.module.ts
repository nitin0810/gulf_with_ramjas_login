import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComplaintPageManagement } from './complaint';

import { CustomNavbarModule } from '../../../custom-components/navbar/navbar.module';
import { ComplaintMainModule } from '../../../custom-components/complaint-main/complaint-main.module';
import { SortFilterOptionsModule } from '../../../custom-components/sort-filter-options/sort-filter.module';

@NgModule({
  
    declarations: [ComplaintPageManagement],
   
    imports: [
        CustomNavbarModule,
        SortFilterOptionsModule,
        ComplaintMainModule,
        IonicPageModule.forChild(ComplaintPageManagement)
    ],
    
})
export class ComplaintModuleManagement { }  