import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { NewAppreciationPageStudent } from './new';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';


@NgModule({
  
    declarations: [NewAppreciationPageStudent],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewAppreciationPageStudent)
    ],
    
})
export class AppreciationNewModuleStudent { }  