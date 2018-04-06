import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentElectivePageComponent } from './currentCircular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { ListElectiveModuleManagement } from '../list/list.module';


@NgModule({
  
    declarations: [CurrentElectivePageComponent],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(CurrentElectivePageComponent),
        ListElectiveModuleManagement 
        
    ],
    
})
export class CurrentElectiveModule { }  