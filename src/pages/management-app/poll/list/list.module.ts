import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPollPageManagement } from './list';
import { MomentModule } from 'angular2-moment';


@NgModule({
  
    declarations: [ListPollPageManagement],
   
    imports: [
        MomentModule,
        IonicPageModule.forChild(ListPollPageManagement)
    ],
    exports:[ListPollPageManagement]
    
})
export class ListPollModuleManagement { }  