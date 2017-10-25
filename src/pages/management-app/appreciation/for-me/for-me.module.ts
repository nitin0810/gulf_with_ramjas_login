import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AppreciationForMePageManagement } from './for-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { AppreciationListModule } from '../../../../custom-components/list/list.module';


@NgModule({
  
    declarations: [AppreciationForMePageManagement],
   
    imports: [
        CustomNavbarModule,
        AppreciationListModule,
        IonicPageModule.forChild(AppreciationForMePageManagement)
    ],
    
})
export class AppreciationForMeModule { }  