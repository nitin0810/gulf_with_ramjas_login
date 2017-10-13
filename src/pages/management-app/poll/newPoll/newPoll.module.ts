import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPollPageManagement } from './newPoll';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [NewPollPageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewPollPageManagement)
    ],
    
})
export class NewPollModuleManagement { }  