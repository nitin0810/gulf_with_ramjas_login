import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDeletePopoverPage } from './popover';

@NgModule({
  
    declarations: [EditDeletePopoverPage],
   
    imports: [
        
        IonicPageModule.forChild(EditDeletePopoverPage)
    ],
    
})
export class EditDeletePopoverModule { }  