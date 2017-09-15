import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbar } from './navbar';

@NgModule({
  declarations: [CustomNavbar],
  
  imports: [IonicPageModule.forChild(CustomNavbar)],
  exports: [CustomNavbar]
})
export class CustomNavbarModule { }