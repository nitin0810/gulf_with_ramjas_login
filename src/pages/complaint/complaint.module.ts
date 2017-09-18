import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../custom-components/navbar/navbar.module';

import { ComplaintPage } from './complaint';
import { ComplaintService } from './complaint.service';

@NgModule({
  
    declarations: [ComplaintPage],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(ComplaintPage)
    ],
    providers:[ComplaintService]
    
})
export class ComplaintModule { }  