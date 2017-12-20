import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosedCircularPageComponent } from './closedCircular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { ListCircularModuleManagement } from '../../circular/list/list.module';

@NgModule({
  
    declarations: [ClosedCircularPageComponent],
   
    imports: [
        CustomNavbarModule,
        ListCircularModuleManagement,        
        IonicPageModule.forChild(ClosedCircularPageComponent)
    ],
    
})
export class ClosedCircularModule { }  