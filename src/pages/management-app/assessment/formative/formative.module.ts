import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AssessmentFormativePageManagement } from './formative';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [AssessmentFormativePageManagement],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(AssessmentFormativePageManagement)
    ],
    
})
export class AssessmentFormativeModule { }  