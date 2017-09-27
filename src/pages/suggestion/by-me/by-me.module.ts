import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { CustomNavbarModule } from '../../../custom-components/navbar/navbar.module';
import { SuggestionByMe } from './by-me';


@NgModule({
  
    declarations: [SuggestionByMe],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(SuggestionByMe)
    ],
    
})
export class SuggestionByMeModule { }  