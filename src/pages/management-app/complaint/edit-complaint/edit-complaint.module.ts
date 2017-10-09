import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintEditPage } from './edit-complaint';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  declarations: [ComplaintEditPage],
  
  imports: [
    CustomModalNavbarModule,
      IonicPageModule.forChild(ComplaintEditPage)
    ],
  exports: [ComplaintEditPage]
})

export class ComplaintEditModule { }