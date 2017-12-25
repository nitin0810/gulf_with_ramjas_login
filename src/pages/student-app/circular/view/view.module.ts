import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';
import { CircularStudentViewPage } from './view';


@NgModule({
  
    declarations: [CircularStudentViewPage],
   
    imports: [
        MomentModule,
        CustomModalNavbarModule,
        IonicPageModule.forChild(CircularStudentViewPage)
    ],
    
})
export class CircularViewModuleStudent { }  