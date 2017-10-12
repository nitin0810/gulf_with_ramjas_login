import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { SuggestionForMeStudent } from './for-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [SuggestionForMeStudent],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(SuggestionForMeStudent)
    ],
    
})
export class SuggestionForMeModule { }  