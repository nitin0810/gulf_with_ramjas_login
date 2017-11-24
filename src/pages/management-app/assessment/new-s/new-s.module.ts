import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { NewSummativePageManagement } from './new-s';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';


@NgModule({
  
    declarations: [NewSummativePageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewSummativePageManagement)
    ],
    
})
export class NewSummativeModule { }  