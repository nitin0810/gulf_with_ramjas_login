import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCircularPageManagement } from './list';
import { MomentModule } from 'angular2-moment';


@NgModule({
  
    declarations: [ListCircularPageManagement],
   
    imports: [
        MomentModule,
        IonicPageModule.forChild(ListCircularPageManagement)
    ],
    exports:[ListCircularPageManagement]
    
})
export class ListCircularModuleManagement { }  