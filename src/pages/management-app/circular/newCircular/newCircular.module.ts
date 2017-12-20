import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCircularComponent } from './newCircular';
import { CustomModalNavbarModule } from '../../../../custom-components/modal-navbar/modal-navbar.module';

@NgModule({
  
    declarations: [NewCircularComponent],
   
    imports: [
        CustomModalNavbarModule,
        IonicPageModule.forChild(NewCircularComponent)
    ],
    
})
export class NewCircularModule { }  