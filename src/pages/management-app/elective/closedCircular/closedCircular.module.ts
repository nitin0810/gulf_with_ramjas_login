import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosedElectivePageComponent } from './closedCircular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { ListCircularModuleManagement } from '../../circular/list/list.module';

@NgModule({
  
    declarations: [ClosedElectivePageComponent],
   
    imports: [
        CustomNavbarModule,
        ListCircularModuleManagement,        
        IonicPageModule.forChild(ClosedElectivePageComponent)
    ],
    
})
export class ClosedElectiveModule { }  