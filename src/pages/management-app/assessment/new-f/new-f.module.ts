import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { NewFormativePageManagement } from './new-f';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';


@NgModule({
  
    declarations: [NewFormativePageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewFormativePageManagement)
    ],
    
})
export class NewFormativeModule { }  