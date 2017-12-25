import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { CircularStudentListPage } from './list';


@NgModule({
  
    declarations: [CircularStudentListPage],
   
    imports: [
        MomentModule,
        CustomNavbarModule,
        IonicPageModule.forChild(CircularStudentListPage)
    ],
    
})
export class CircularModuleStudent { }  