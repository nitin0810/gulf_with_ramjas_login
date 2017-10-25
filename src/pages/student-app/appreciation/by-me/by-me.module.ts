import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AppreciationByMePageStudent } from './by-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { AppreciationListModule } from '../../../../custom-components/list/list.module';


@NgModule({
  
    declarations: [AppreciationByMePageStudent],
   
    imports: [
        CustomNavbarModule,
        AppreciationListModule,
        IonicPageModule.forChild(AppreciationByMePageStudent)
    ],
    
})
export class AppreciationByMeModuleStudent { }  