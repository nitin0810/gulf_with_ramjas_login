import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListElectivePageManagement } from './list';
import { MomentModule } from 'angular2-moment';


@NgModule({
  
    declarations: [ListElectivePageManagement],
   
    imports: [
        MomentModule,
        IonicPageModule.forChild(ListElectivePageManagement)
    ],
    exports:[ListElectivePageManagement]
    
})
export class ListElectiveModuleManagement { }  