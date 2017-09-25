import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';

import { ComplaintPage } from './complaint';

@NgModule({
  
    declarations: [ComplaintPage],
   
    imports: [
        CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(ComplaintPage)
    ],
    
})
export class ComplaintModule { }  