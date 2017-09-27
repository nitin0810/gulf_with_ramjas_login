import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { CustomNavbarModule } from '../../../custom-components/navbar/navbar.module';
import { SuggestionForMe } from './for-me';


@NgModule({
  
    declarations: [SuggestionForMe],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(SuggestionForMe)
    ],
    
})
export class SuggestionForMeModule { }  