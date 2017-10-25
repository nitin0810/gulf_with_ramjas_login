import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AppreciationForMePageStudent } from './for-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [AppreciationForMePageStudent],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(AppreciationForMePageStudent)
    ],
    
})
export class AppreciationForMeModuleStudent { }  