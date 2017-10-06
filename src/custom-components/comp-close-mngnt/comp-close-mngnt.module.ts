import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintCloseManagementPage } from './comp-close-mngnt';
import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';

@NgModule({
  declarations: [ComplaintCloseManagementPage],
  
  imports: [
    CustomModalNavbarModule,
      IonicPageModule.forChild(ComplaintCloseManagementPage)
    ],
  exports: [ComplaintCloseManagementPage]
})

export class ComplaintCloseManagementModule { }