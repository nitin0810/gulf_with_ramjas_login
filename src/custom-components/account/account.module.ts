import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { CustomNavbarModule } from '../../custom-components/navbar/navbar.module';

@NgModule({
  declarations: [AccountPage],
  
  imports: [
    CustomNavbarModule,
    IonicPageModule.forChild(AccountPage)],
    
})

export class AccountModule { }