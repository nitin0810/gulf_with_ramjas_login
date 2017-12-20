import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentCircularPageComponent } from './currentCircular';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { ListCircularModuleManagement } from '../list/list.module';


@NgModule({
  
    declarations: [CurrentCircularPageComponent],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(CurrentCircularPageComponent),
        ListCircularModuleManagement 
        
    ],
    
})
export class CurrentCircularModule { }  