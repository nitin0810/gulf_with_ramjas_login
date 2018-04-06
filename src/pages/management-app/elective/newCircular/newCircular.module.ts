import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewElectiveComponent } from './newCircular';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [NewElectiveComponent],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewElectiveComponent)
    ],
    
})
export class NewElectiveModule { }  