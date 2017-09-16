import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../custom-components/navbar/navbar.module';

import { ComplaintPage } from './complaint';

@NgModule({
    entryComponents: [ComplaintPage],
    declarations: [ComplaintPage],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(ComplaintPage)
    ],
    
})
export class ComplaintModule { }  