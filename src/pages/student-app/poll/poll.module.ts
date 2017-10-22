import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { CustomNavbarModule } from '../../../custom-components/navbar/navbar.module';

import { PollStudent } from './poll';


@NgModule({
  
    declarations: [PollStudent],
   
    imports: [
        MomentModule,
        CustomNavbarModule,
        IonicPageModule.forChild(PollStudent)
    ],
    
})
export class PollModuleStudent { }  