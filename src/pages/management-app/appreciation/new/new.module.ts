import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { NewAppreciationPageManagement } from './new';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';


@NgModule({
  
    declarations: [NewAppreciationPageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewAppreciationPageManagement)
    ],
    
})
export class AppreciationNewModule { }  