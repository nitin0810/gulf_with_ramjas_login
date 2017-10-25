import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AppreciationForMePageStudent } from './for-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { AppreciationListModule } from '../../../../custom-components/list/list.module';


@NgModule({
  
    declarations: [AppreciationForMePageStudent],
   
    imports: [
        CustomNavbarModule,
        AppreciationListModule,
        IonicPageModule.forChild(AppreciationForMePageStudent)
    ],
    
})
export class AppreciationForMeModuleStudent { }  