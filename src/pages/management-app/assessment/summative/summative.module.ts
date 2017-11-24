import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AssessmentSummativePageManagement } from './summative';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [AssessmentSummativePageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(AssessmentSummativePageManagement)
    ],
    
})
export class AssessmentSummativeModule { }  