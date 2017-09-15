import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNavbar } from './modal-navbar';

@NgModule({
  declarations: [ModalNavbar],
  
  imports: [IonicPageModule.forChild(ModalNavbar)],
  exports: [ModalNavbar]
})
export class CustomModalNavbarModule { }