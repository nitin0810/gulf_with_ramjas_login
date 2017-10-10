import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacultySearchPage } from './search';
import { CustomModalNavbarModule } from '../../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  declarations: [FacultySearchPage],
  
  imports: [
    CustomModalNavbarModule,
      IonicPageModule.forChild(FacultySearchPage)
    ],
})

export class FacultySearchModule { }