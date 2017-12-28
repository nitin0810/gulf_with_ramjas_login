import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// import { MomentModule } from 'angular2-moment';
import { NewTimeTablePageManagement } from './new';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [NewTimeTablePageManagement],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewTimeTablePageManagement)
    ],
    
})
export class NewTimeTableModuleManagement { }  