import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';
import { PollPage } from './poll';


@NgModule({
  
    declarations: [PollPage],
   
    imports: [
        CustomNavbarModule,
        MomentModule,
        IonicPageModule.forChild(PollPage)
    ],
    
})
export class PollModule { }  