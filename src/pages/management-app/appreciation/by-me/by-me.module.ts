import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AppreciationByMePageManagement } from './by-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { AppreciationListModule } from '../../../../custom-components/list/list.module';


@NgModule({
  
    declarations: [AppreciationByMePageManagement],
   
    imports: [
        CustomNavbarModule,
        AppreciationListModule,
        IonicPageModule.forChild(AppreciationByMePageManagement)
    ],
    
})
export class AppreciationByMeModule { }  