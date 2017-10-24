import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AppreciationForMePageManagement } from './for-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [AppreciationForMePageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(AppreciationForMePageManagement)
    ],
    
})
export class AppreciationForMeModule { }  