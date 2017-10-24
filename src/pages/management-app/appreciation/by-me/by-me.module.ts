import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AppreciationByMePageManagement } from './by-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [AppreciationByMePageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(AppreciationByMePageManagement)
    ],
    
})
export class AppreciationByMeModule { }  