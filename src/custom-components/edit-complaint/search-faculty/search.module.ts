import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModalNavbarModule } from '../../modal-navbar/modal-navbar.module';
import { FacultySearchPage } from './search';

@NgModule({
  declarations: [FacultySearchPage],
  
  imports: [
    CustomModalNavbarModule,
      IonicPageModule.forChild(FacultySearchPage)
    ],
//   exports: [FacultySearchPage]
})

export class FacultySearchModule { }