import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { SuggestionForMe } from './for-me';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [SuggestionForMe],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(SuggestionForMe)
    ],
    
})
export class SuggestionForMeModule { }  