import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AppreciationByMePageStudent } from './by-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [AppreciationByMePageStudent],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(AppreciationByMePageStudent)
    ],
    
})
export class AppreciationByMeModuleStudent { }  