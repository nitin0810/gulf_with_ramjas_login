import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';
import { ComplaintEditPage } from './edit-complaint';

@NgModule({
  declarations: [ComplaintEditPage],
  
  imports: [
    CustomModalNavbarModule,
      IonicPageModule.forChild(ComplaintEditPage)
    ],
  exports: [ComplaintEditPage]
})

export class ComplaintEditModule { }