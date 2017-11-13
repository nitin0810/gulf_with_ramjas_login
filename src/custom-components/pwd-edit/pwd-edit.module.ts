import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPasswordPage } from './pwd-edit';
import { CustomModalNavbarModule } from '../modal-navbar/modal-navbar.module';

@NgModule({
  declarations: [EditPasswordPage],
  
  imports: [
    CustomModalNavbarModule,
    IonicPageModule.forChild(EditPasswordPage)],
    
})

export class EditPasswordPageModule { }